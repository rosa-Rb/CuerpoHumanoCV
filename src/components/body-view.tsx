import { useEffect, useRef } from "react";
import type { BufferGeometry, Object3D, Vector3 } from "three";

type Layer = "all" | "superior" | "torax" | "abdomen";

const LAYERS: Record<string, Layer> = {
  cerebro: "superior",
  corazon: "torax",
  pulmones: "torax",
  estomago: "abdomen",
  higado: "abdomen",
  rinones: "abdomen",
  intestinos: "abdomen",
};

export function BodyView({
  selected,
  layer,
  opacity,
  onSelect,
}: {
  selected: string;
  layer: Layer;
  opacity: number;
  onSelect: (id: string) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selected);
  const layerRef = useRef(layer);
  const opacityRef = useRef(opacity);
  onSelectRef.current = onSelect;
  selectedRef.current = selected;
  layerRef.current = layer;
  opacityRef.current = opacity;

  const api = useRef<{
    setOpacity: (value: number) => void;
    setLayer: (value: Layer) => void;
    setSelected: (id: string) => void;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let frame = 0;
    const cleanups: Array<() => void> = [];

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf7f5f1);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 1.05, 3.6);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.touchAction = "none";

      scene.add(new THREE.AmbientLight(0xffffff, 0.72));
      const key = new THREE.DirectionalLight(0xfff6ee, 1.05);
      key.position.set(3, 5, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xd7e4ea, 0.45);
      fill.position.set(-3, 2, -2);
      scene.add(fill);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0.95, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 1.8;
      controls.maxDistance = 6;
      controls.maxPolarAngle = Math.PI * 0.85;

      const skin = new THREE.MeshStandardMaterial({
        color: 0xf0c7ae,
        roughness: 0.58,
        metalness: 0.02,
        transparent: true,
        opacity: opacityRef.current,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const body = new THREE.Group();
      scene.add(body);
      const add = (geometry: BufferGeometry, x: number, y: number, z: number) => {
        const mesh = new THREE.Mesh(geometry, skin);
        mesh.position.set(x, y, z);
        mesh.rotation.set(0, 0, 0);
        body.add(mesh);
        return mesh;
      };

      add(new THREE.SphereGeometry(0.2, 28, 22), 0, 1.62, 0);
      add(new THREE.CylinderGeometry(0.065, 0.075, 0.12, 14), 0, 1.44, 0);
      add(new THREE.CylinderGeometry(0.24, 0.21, 0.4, 18), 0, 1.16, 0);
      add(new THREE.CylinderGeometry(0.21, 0.19, 0.32, 18), 0, 0.8, 0);
      const hips = add(new THREE.SphereGeometry(0.21, 20, 16), 0, 0.56, 0);
      hips.scale.set(1.15, 0.62, 0.88);

      const arm = (side: number) => {
        const x = side * 0.3;
        add(new THREE.SphereGeometry(0.055, 12, 10), x, 1.32, 0);
        add(new THREE.CylinderGeometry(0.048, 0.044, 0.34, 12), x, 1.12, 0);
        add(new THREE.CylinderGeometry(0.042, 0.038, 0.3, 12), x, 0.8, 0);
        add(new THREE.SphereGeometry(0.042, 10, 8), x, 0.62, 0);
      };
      arm(-1);
      arm(1);

      const leg = (side: number) => {
        const x = side * 0.12;
        add(new THREE.CylinderGeometry(0.08, 0.068, 0.4, 12), x, 0.28, 0);
        add(new THREE.CylinderGeometry(0.06, 0.05, 0.38, 12), x, -0.12, 0);
        add(new THREE.BoxGeometry(0.1, 0.05, 0.2), x, -0.36, 0.04);
      };
      leg(-1);
      leg(1);

      const organs = new THREE.Group();
      scene.add(organs);
      const meshes = new Map<string, Object3D>();

      const mat = (color: number, emissive: number) =>
        new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: 0.18,
          roughness: 0.42,
          metalness: 0.06,
        });

      const place = (
        id: string,
        object: Object3D,
        position: [number, number, number],
        scale: [number, number, number],
      ) => {
        object.position.set(...position);
        object.scale.set(...scale);
        object.userData.id = id;
        object.userData.base = object.scale.clone();
        object.traverse((child) => {
          child.userData.organId = id;
        });
        organs.add(object);
        meshes.set(id, object);
      };

      const brain = new THREE.Group();
      const brainMat = mat(0xff9ec7, 0xff6b9d);
      const hemi = (x: number) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 16), brainMat);
        mesh.scale.set(0.85, 0.9, 0.95);
        mesh.position.x = x;
        brain.add(mesh);
      };
      hemi(-0.28);
      hemi(0.28);
      place("cerebro", brain, [0, 1.62, 0.02], [0.18, 0.16, 0.17]);

      const heart = new THREE.Group();
      const heartMat = mat(0xff4d6d, 0xe63946);
      const lobe = (x: number) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 14), heartMat);
        mesh.position.set(x, 0.22, 0);
        heart.add(mesh);
      };
      lobe(-0.28);
      lobe(0.28);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.8, 16), heartMat);
      tip.position.set(0, -0.35, 0);
      tip.rotation.x = Math.PI;
      heart.add(tip);
      place("corazon", heart, [0.07, 1.18, 0.1], [0.11, 0.12, 0.1]);

      const lungs = new THREE.Group();
      const lungMat = mat(0xffb4a2, 0xe5989b);
      [-0.48, 0.48].forEach((x) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 14), lungMat);
        mesh.scale.set(0.75, 1.2, 0.65);
        mesh.position.set(x, 0.05, 0);
        lungs.add(mesh);
      });
      place("pulmones", lungs, [0, 1.18, 0], [0.26, 0.22, 0.15]);

      const stomach = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 14), mat(0xffbe0b, 0xfb8500));
      stomach.scale.set(0.9, 1.1, 0.75);
      const stomachGroup = new THREE.Group();
      stomachGroup.add(stomach);
      place("estomago", stomachGroup, [-0.06, 0.88, 0.08], [0.13, 0.12, 0.1]);

      const liver = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), mat(0xbc6c25, 0x8b5e34));
      liver.scale.set(1.15, 0.7, 0.65);
      const liverGroup = new THREE.Group();
      liverGroup.add(liver);
      place("higado", liverGroup, [0.1, 0.94, 0.04], [0.13, 0.1, 0.09]);

      const kidneys = new THREE.Group();
      const kidneyMat = mat(0xe76f51, 0xc1121f);
      [-0.48, 0.48].forEach((x, index) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), kidneyMat);
        mesh.scale.set(0.65, 1.15, 0.5);
        mesh.position.x = x;
        mesh.rotation.z = index === 0 ? 0.25 : -0.25;
        kidneys.add(mesh);
      });
      place("rinones", kidneys, [0, 0.76, -0.08], [0.16, 0.11, 0.08]);

      const intestines = new THREE.Group();
      const gutMat = mat(0x90be6d, 0x43aa8b);
      for (let i = 0; i < 7; i += 1) {
        const angle = (i / 7) * Math.PI * 2.2;
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.3, 8), gutMat);
        tube.position.set(Math.cos(angle) * 0.32, (i - 3) * 0.15, Math.sin(angle) * 0.16);
        tube.rotation.z = angle * 0.35;
        intestines.add(tube);
      }
      place("intestinos", intestines, [0, 0.56, 0.05], [0.2, 0.16, 0.13]);

      const paint = (id: string) => {
        meshes.forEach((object, key) => {
          const on = key === id;
          object.traverse((child) => {
            if (
              child instanceof THREE.Mesh &&
              child.material instanceof THREE.MeshStandardMaterial
            ) {
              child.material.emissiveIntensity = on ? 0.55 : 0.16;
            }
          });
        });
      };

      const applyLayer = (value: Layer) => {
        meshes.forEach((object, id) => {
          object.visible = value === "all" || LAYERS[id] === value;
        });
      };

      api.current = {
        setOpacity: (value) => {
          skin.opacity = value;
        },
        setLayer: applyLayer,
        setSelected: paint,
      };
      applyLayer(layerRef.current);
      paint(selectedRef.current);
      skin.opacity = opacityRef.current;

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const onPointer = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(organs.children, true)[0];
        if (!hit) return;
        let node: Object3D | null = hit.object;
        while (node && !node.userData.organId && !node.userData.id) node = node.parent;
        const id = (node?.userData.organId || node?.userData.id) as string | undefined;
        if (id && meshes.get(id)?.visible) onSelectRef.current(id);
      };
      renderer.domElement.addEventListener("pointerdown", onPointer);
      cleanups.push(() => renderer.domElement.removeEventListener("pointerdown", onPointer));

      const resize = () => {
        const width = mount.clientWidth || 320;
        const height = mount.clientHeight || 520;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(mount);
      cleanups.push(() => observer.disconnect());

      const clockStart = performance.now();
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const time = (performance.now() - clockStart) * 0.001;
        meshes.forEach((object) => {
          const base = object.userData.base as Vector3 | undefined;
          if (!base || !object.visible) return;
          const beat = object.userData.id === "corazon" ? 1 + Math.sin(time * 4.2) * 0.04 : 1 + Math.sin(time * 2) * 0.02;
          object.scale.copy(base).multiplyScalar(beat);
        });
        controls.update();
        renderer.render(scene, camera);
      };
      tick();

      cleanups.push(() => {
        cancelAnimationFrame(frame);
        controls.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        api.current = null;
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    api.current?.setOpacity(opacity);
  }, [opacity]);

  useEffect(() => {
    api.current?.setLayer(layer);
  }, [layer]);

  useEffect(() => {
    api.current?.setSelected(selected);
  }, [selected]);

  return <div ref={mountRef} className="h-[520px] w-full" />;
}

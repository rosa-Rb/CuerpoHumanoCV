import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/proyecto")({
  beforeLoad: () => {
    throw redirect({ to: "/inicio" });
  },
});

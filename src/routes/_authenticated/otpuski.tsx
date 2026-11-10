import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/_authenticated/otpuski")({
  head: () => ({
    meta: [
      { title: "Отпуски | Фирмен портал" },
      { name: "description", content: "Управление на отпуските на служителите." },
      { property: "og:title", content: "Отпуски | Фирмен портал" },
      { property: "og:description", content: "Управление на отпуските на служителите." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Отпуски" description="Управление на отпуските на служителите." />,
});

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/fakturi")({
  head: () => ({
    meta: [
      { title: "Фактури | Фирмен портал" },
      { name: "description", content: "Преглед и управление на фактури." },
      { property: "og:title", content: "Фактури | Фирмен портал" },
      { property: "og:description", content: "Преглед и управление на фактури." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Фактури" description="Преглед и управление на фактури." />,
});

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/_authenticated/potrebiteli")({
  head: () => ({
    meta: [
      { title: "Потребители | Фирмен портал" },
      { name: "description", content: "Управление на потребителите." },
      { property: "og:title", content: "Потребители | Фирмен портал" },
      { property: "og:description", content: "Управление на потребителите." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Потребители" description="Управление на потребителите." />,
});

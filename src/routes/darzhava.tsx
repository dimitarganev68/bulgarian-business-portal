import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/darzhava")({
  head: () => ({
    meta: [
      { title: "Държава | Фирмен портал" },
      { name: "description", content: "Номенклатура на държавите." },
      { property: "og:title", content: "Държава | Фирмен портал" },
      { property: "og:description", content: "Номенклатура на държавите." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Държава" description="Номенклатура на държавите." />,
});

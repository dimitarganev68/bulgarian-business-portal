import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/grad")({
  head: () => ({
    meta: [
      { title: "Град | Фирмен портал" },
      { name: "description", content: "Номенклатура на градовете." },
      { property: "og:title", content: "Град | Фирмен портал" },
      { property: "og:description", content: "Номенклатура на градовете." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Град" description="Номенклатура на градовете." />,
});

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Начална | Фирмен портал" },
      { name: "description", content: "Добре дошли във фирмения портал." },
      { property: "og:title", content: "Начална | Фирмен портал" },
      { property: "og:description", content: "Добре дошли във фирмения портал." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Начална" description="Добре дошли във фирмения портал." />,
});

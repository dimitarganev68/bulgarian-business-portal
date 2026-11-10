import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/grupi")({
  head: () => ({
    meta: [
      { title: "Групи | Фирмен портал" },
      { name: "description", content: "Настройки на потребителски групи." },
      { property: "og:title", content: "Групи | Фирмен портал" },
      { property: "og:description", content: "Настройки на потребителски групи." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell title="Групи" description="Настройки на потребителски групи." />,
});

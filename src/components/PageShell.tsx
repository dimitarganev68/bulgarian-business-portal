export function PageShell({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
        Съдържанието ще бъде добавено скоро.
      </div>
    </section>
  );
}

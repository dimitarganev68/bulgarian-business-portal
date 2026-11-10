import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-secondary-foreground sm:grid-cols-3">
        <div>
          <p className="font-display text-base font-semibold">Име на фирмата ООД</p>
          <p className="mt-1 text-muted-foreground">© {new Date().getFullYear()} Всички права запазени.</p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> гр. София, ул. Примерна 1</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +359 2 000 0000</p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> office@firma.bg</p>
        </div>
      </div>
    </footer>
  );
}

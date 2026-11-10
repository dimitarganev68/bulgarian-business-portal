import { Link } from "@tanstack/react-router";
import { ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
const active = { className: "bg-accent text-foreground" };

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <Link to="/" className="flex h-10 w-28 items-center justify-center rounded-md border border-dashed border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Лого
        </Link>
        <nav className="flex flex-1 items-center gap-1">
          <Link to="/" className={linkCls} activeProps={active} activeOptions={{ exact: true }}>Начална</Link>
          <Link to="/otpuski" className={linkCls} activeProps={active}>Отпуски</Link>
          <Link to="/fakturi" className={linkCls} activeProps={active}>Фактури</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${linkCls} inline-flex items-center gap-1 outline-none`}>
              Настройки <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild><Link to="/grupi">Групи</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/potrebiteli">Потребители</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/grad">Град</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/darzhava">Държава</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <Button><LogIn className="h-4 w-4" /> Вход</Button>
      </div>
    </header>
  );
}

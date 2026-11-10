import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, KeyRound, LogIn, LogOut, UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
const active = { className: "bg-accent text-foreground" };

export function SiteHeader() {
  const { user, name, ready } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pwOpen, setPwOpen] = useState(false);

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <Link to="/" className="flex h-10 w-28 items-center justify-center rounded-md border border-dashed border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Лого
        </Link>
        <nav className="flex flex-1 items-center gap-1">
          <Link to="/" className={linkCls} activeProps={active} activeOptions={{ exact: true }}>Начална</Link>
          {user && (<>
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
          </>)}
        </nav>
        {!ready ? (
          <div className="h-9 w-24" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><UserCircle className="h-4 w-4" /> {name} <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setPwOpen(true)}><KeyRound className="h-4 w-4" /> Смяна на парола</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={signOut}><LogOut className="h-4 w-4" /> Изход</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild><Link to="/auth"><LogIn className="h-4 w-4" /> Вход</Link></Button>
        )}
        <ChangePasswordDialog open={pwOpen} onOpenChange={setPwOpen} />
      </div>
    </header>
  );
}

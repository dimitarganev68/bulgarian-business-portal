import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async (u: User | null) => {
      setUser(u);
      if (u) {
        const { data } = await supabase.from("profiles").select("full_name").eq("id", u.id).maybeSingle();
        setName(data?.full_name || (u.user_metadata?.["full_name"] as string) || u.email || "");
      } else setName("");
      setReady(true);
    };
    supabase.auth.getSession().then(({ data }) => load(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setTimeout(() => load(session?.user ?? null), 0);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, name, ready };
}

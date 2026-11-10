import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход и регистрация | Фирмен портал" },
      { name: "description", content: "Влезте или създайте акаунт във фирмения портал." },
      { property: "og:title", content: "Вход и регистрация | Фирмен портал" },
      { property: "og:description", content: "Влезте или създайте акаунт във фирмения портал." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error("Грешен имейл или парола");
    navigate({ to: "/", replace: true });
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Името е задължително");
    if (password.length < 6) return toast.error("Паролата трябва да е поне 6 символа");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: fullName.trim() } },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (data.session) navigate({ to: "/", replace: true });
    else setSent(true);
  };

  return (
    <section className="mx-auto w-full max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">Вход</h1>
      {sent ? (
        <p className="mt-6 rounded-lg border border-border bg-card p-6 text-sm">
          Изпратихме ви имейл за потвърждение на <b>{email}</b>. Потвърдете регистрацията и след това влезте.
        </p>
      ) : (
        <Tabs defaultValue="login" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={login} className="space-y-4 pt-4">
              <Field id="l-email" label="Имейл" type="email" value={email} onChange={setEmail} />
              <Field id="l-pass" label="Парола" type="password" value={password} onChange={setPassword} />
              <Button type="submit" className="w-full" disabled={busy}>Вход</Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={register} className="space-y-4 pt-4">
              <Field id="r-name" label="Име" value={fullName} onChange={setFullName} />
              <Field id="r-email" label="Имейл" type="email" value={email} onChange={setEmail} />
              <Field id="r-pass" label="Парола" type="password" value={password} onChange={setPassword} />
              <Button type="submit" className="w-full" disabled={busy}>Регистрация</Button>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}

function Field({ id, label, value, onChange, type = "text" }: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

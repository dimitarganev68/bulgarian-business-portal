import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ChangePasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 6) { toast.error("Новата парола трябва да е поне 6 символа"); return; }
    if (next !== confirm) { toast.error("Паролите не съвпадат"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: next, current_password: current } as never);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Паролата е сменена");
    setCurrent(""); setNext(""); setConfirm("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader><DialogTitle>Смяна на парола</DialogTitle></DialogHeader>
          <div className="space-y-2"><Label htmlFor="cp-cur">Текуща парола</Label><Input id="cp-cur" type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="cp-new">Нова парола</Label><Input id="cp-new" type="password" required value={next} onChange={(e) => setNext(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="cp-conf">Повторете новата парола</Label><Input id="cp-conf" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Отказ</Button>
            <Button type="submit" disabled={busy}>Запази</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

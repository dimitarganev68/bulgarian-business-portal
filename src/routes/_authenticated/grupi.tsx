import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Group = { id: number; name: string; comment: string };
const groupsKey = ["groups"] as const;

function useGroups() {
  return useQuery({
    queryKey: groupsKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("groups").select("id, name, comment").order("id");
      if (error) throw error;
      return data as Group[];
    },
  });
}

function useGroupMutation<T>(fn: (v: T) => Promise<{ error: unknown }>, ok: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: T) => { const { error } = await fn(v); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: groupsKey }); toast.success(ok); },
    onError: () => toast.error("Възникна грешка. Опитайте отново."),
  });
}

export const Route = createFileRoute("/_authenticated/grupi")({
  head: () => ({
    meta: [
      { title: "Групи | Фирмен портал" },
      { name: "description", content: "Списък и управление на потребителски групи." },
      { property: "og:title", content: "Групи | Фирмен портал" },
      { property: "og:description", content: "Списък и управление на потребителски групи." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GroupsPage,
});

type Key = "id" | "name" | "comment";
const cols: { key: Key; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Име" },
  { key: "comment", label: "Коментар" },
];

function GroupsPage() {
  const { data: groups = [], isLoading } = useGroups();
  const removeM = useGroupMutation((id: number) => supabase.from("groups").delete().eq("id", id), "Групата е изтрита");
  const [sort, setSort] = useState<{ key: Key; dir: "asc" | "desc" }>({ key: "id", dir: "asc" });
  const [filters, setFilters] = useState<Record<Key, string>>({ id: "", name: "", comment: "" });
  const [editing, setEditing] = useState<Group | "new" | null>(null);
  const [deleting, setDeleting] = useState<Group | null>(null);

  const rows = useMemo(() => {
    const f = groups.filter((g) =>
      cols.every(({ key }) => String(g[key]).toLowerCase().includes(filters[key].trim().toLowerCase())),
    );
    return [...f].sort((a, b) => {
      const r = sort.key === "id" ? a.id - b.id : String(a[sort.key]).localeCompare(String(b[sort.key]), "bg");
      return sort.dir === "asc" ? r : -r;
    });
  }, [groups, filters, sort]);

  const toggleSort = (key: Key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold tracking-tight">Групи</h1>
        <Button onClick={() => setEditing("new")}><Plus className="h-4 w-4" /> Добавяне</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map(({ key, label }) => (
                <TableHead key={key} className={key === "id" ? "w-28" : undefined}>
                  <button onClick={() => toggleSort(key)} className="inline-flex items-center gap-1 font-semibold text-foreground">
                    {label}
                    {sort.key !== key ? <ArrowUpDown className="h-3.5 w-3.5 opacity-50" /> : sort.dir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                  </button>
                </TableHead>
              ))}
              <TableHead className="w-28 text-right">Действия</TableHead>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              {cols.map(({ key, label }) => (
                <TableHead key={key} className="py-2">
                  <Input
                    aria-label={`Филтър ${label}`}
                    placeholder="Филтър..."
                    value={filters[key]}
                    onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
                    className="h-8"
                  />
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  {isLoading ? "Зареждане..." : groups.length === 0 ? "Няма добавени групи." : "Няма резултати по зададения филтър."}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-mono">{g.id}</TableCell>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell className="text-muted-foreground">{g.comment}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="Редактиране" onClick={() => setEditing(g)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Изтриване" onClick={() => setDeleting(g)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <GroupDialog group={editing} onClose={() => setEditing(null)} />

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Изтриване на група</AlertDialogTitle>
            <AlertDialogDescription>Сигурни ли сте, че искате да изтриете „{deleting?.name}“?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отказ</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && removeM.mutate(deleting.id)}>Изтрий</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function GroupDialog({ group, onClose }: { group: Group | "new" | null; onClose: () => void }) {
  const open = group !== null;
  const existing = group && group !== "new" ? group : null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {open && <GroupForm key={existing?.id ?? "new"} existing={existing} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}

function GroupForm({ existing, onClose }: { existing: Group | null; onClose: () => void }) {
  const [name, setName] = useState(existing?.name ?? "");
  const [comment, setComment] = useState(existing?.comment ?? "");
  const [error, setError] = useState("");
  const addM = useGroupMutation((v: { name: string; comment: string }) => supabase.from("groups").insert(v), "Групата е добавена");
  const updM = useGroupMutation((v: { id: number; name: string; comment: string }) => supabase.from("groups").update({ name: v.name, comment: v.comment }).eq("id", v.id), "Групата е обновена");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Името е задължително"); return; }
    const v = { name: name.trim(), comment: comment.trim() };
    const m = existing ? updM.mutateAsync({ id: existing.id, ...v }) : addM.mutateAsync(v);
    m.then(onClose, () => {});
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{existing ? `Редактиране на група #${existing.id}` : "Нова група"}</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="g-name">Име *</Label>
        <Input id="g-name" value={name} autoFocus onChange={(e) => { setName(e.target.value); setError(""); }} />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="g-comment">Коментар</Label>
        <Textarea id="g-comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Отказ</Button>
        <Button type="submit">Запази</Button>
      </DialogFooter>
    </form>
  );
}

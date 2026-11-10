import { useSyncExternalStore } from "react";

export type Group = { id: number; name: string; comment: string };

export function createGroupsStore() {
  let groups: Group[] = [];
  let nextId = 1;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());
  const clean = (name: string) => {
    const n = name.trim();
    if (!n) throw new Error("Името е задължително");
    return n;
  };
  return {
    getAll: () => groups,
    subscribe: (l: () => void) => (listeners.add(l), () => listeners.delete(l)),
    add(name: string, comment = "") {
      const g = { id: nextId++, name: clean(name), comment: comment.trim() };
      groups = [...groups, g];
      emit();
      return g;
    },
    update(id: number, name: string, comment = "") {
      const n = clean(name);
      groups = groups.map((g) => (g.id === id ? { ...g, name: n, comment: comment.trim() } : g));
      emit();
    },
    remove(id: number) {
      groups = groups.filter((g) => g.id !== id);
      emit();
    },
  };
}

export const groupsStore = createGroupsStore();

export function useGroups() {
  return useSyncExternalStore(groupsStore.subscribe, groupsStore.getAll, groupsStore.getAll);
}

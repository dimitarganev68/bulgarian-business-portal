import { describe, it, expect } from "vitest";
import { createGroupsStore } from "./groups-store";

describe("groups store", () => {
  it("assigns sequential IDs starting from 1", () => {
    const s = createGroupsStore();
    expect(s.add("A").id).toBe(1);
    expect(s.add("B").id).toBe(2);
  });
  it("never reuses an ID after deletion", () => {
    const s = createGroupsStore();
    s.add("A"); const b = s.add("B");
    s.remove(b.id);
    expect(s.add("C").id).toBe(3);
  });
  it("requires a name", () => {
    const s = createGroupsStore();
    expect(() => s.add("  ")).toThrow();
    const a = s.add("A");
    expect(() => s.update(a.id, "")).toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { irrToTomanDisplay, tomanToIrr } from "../lib/money";

describe("money utils", () => {
  it("tomanToIrr converts toman to irr", () => {
    expect(tomanToIrr("100")).toBe(1000);
    expect(tomanToIrr(100)).toBe(1000);
  });

  it("tomanToIrr rejects invalid", () => {
    expect(tomanToIrr("0")).toBeNull();
    expect(tomanToIrr("-1")).toBeNull();
    expect(tomanToIrr("abc")).toBeNull();
  });

  it("irrToTomanDisplay formats", () => {
    expect(irrToTomanDisplay(1000)).toContain("100");
  });
});

import type { RoundMode, SplitMode } from "../types";
import type { LangPack } from "../i18n";

export function roundUp(value: number, unit: number): number {
  return Math.ceil(value / unit) * unit;
}

export interface ShareResult {
  shares: Record<string, number> | null;
  ok: boolean;
}

/**
 * Split `amount` among `members`.
 * - manual: read each member's amount from `manualMap`; invalid → not ok.
 * - average: divide evenly, rounded up to the nearest 10 or 100.
 *
 * NOTE: this preserves the original file's behavior exactly — the "zero"
 * ("No round up") mode still rounds up to 10, because the source used
 * `roundMode === "hundred" ? 100 : 10`. See MIGRATION.md for the fix option.
 */
export function computeShares(
  amount: number,
  members: string[],
  roundMode: RoundMode,
  splitMode: SplitMode,
  manualMap: Record<string, number>,
): ShareResult {
  const shares: Record<string, number> = {};

  if (splitMode === "manual") {
    for (const m of members) {
      const v = manualMap[m];
      if (isNaN(v) || v < 0) return { shares: null, ok: false };
      shares[m] = v;
    }
    return { shares, ok: true };
  }

  const unit = roundMode === "hundred" ? 100 : 10;
  const per = members.length ? roundUp(amount / members.length, unit) : 0;
  members.forEach((m) => (shares[m] = per));
  return { shares, ok: true };
}

export function calcMethodLabel(
  roundMode: RoundMode,
  splitMode: SplitMode,
  pack: LangPack,
): string {
  const r =
    roundMode === "hundred" ? pack.roundHundredShort : pack.roundTenShort;
  const s = splitMode === "average" ? pack.splitAverage : pack.splitManual;
  return `${r} | ${s}`;
}

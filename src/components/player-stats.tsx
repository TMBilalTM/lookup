import type { PlayerProfile } from "@/lib/playerdb";

type PlayerStatsProps = {
  player: PlayerProfile;
};

export function PlayerStats({ player }: PlayerStatsProps) {
  const entries = Object.entries(player.meta);
  if (!entries.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</p>
          <p className="truncate text-lg font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}

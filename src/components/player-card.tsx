import Image from "next/image";
import { PLAYER_PLATFORMS, type PlayerProfile } from "@/lib/playerdb";
import { PlayerStats } from "./player-stats";

type PlayerCardProps = {
  player: PlayerProfile;
};

export function PlayerCard({ player }: PlayerCardProps) {
  const platformName =
    PLAYER_PLATFORMS.find((item) => item.id === player.platform)?.label ?? player.platform;

  return (
    <article className="rounded-3xl border border-white/15 bg-linear-to-br from-slate-900/60 via-slate-900/30 to-slate-900/60 p-8 text-white shadow-2xl shadow-black/40">
      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/20 bg-black/40">
          <Image src={player.avatar ?? "/vercel.svg"} alt={`Avatar for ${player.username}`} fill sizes="96px" className="object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">{platformName}</p>
          <h2 className="text-3xl font-semibold leading-tight">{player.username}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {player.id && <Badge label="Profile ID" value={player.id} />}
            {player.rawId && <Badge label="Raw ID" value={player.rawId} />}
          </div>
        </div>
      </header>

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Profile Stats</p>
        <div className="mt-4">
          <PlayerStats player={player} />
        </div>
      </section>

      {player.accounts.length > 0 && (
        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Linked Accounts</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {player.accounts.map((account) => (
              <div key={account.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">
                      {account.service ?? "Account"}
                    </p>
                    <p className="text-lg font-semibold text-white">{account.username ?? account.id}</p>
                  </div>
                  {account.link && (
                    <a
                      href={account.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-sky-300 underline-offset-4 hover:underline"
                    >
                      View
                    </a>
                  )}
                </div>
                {account.extra && (
                  <ul className="mt-3 space-y-1 text-xs text-white/70">
                    {Object.entries(account.extra).map(([key, value]) => (
                      <li key={`${account.id}-${key}`} className="flex items-center justify-between gap-4">
                        <span className="uppercase tracking-widest text-white/40">{key}</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left">
      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

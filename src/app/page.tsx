"use client";

import { useMemo, useState, useTransition } from "react";
import {
  PLAYER_PLATFORMS,
  fetchPlayerProfile,
  type PlayerPlatform,
  type PlayerProfile,
} from "@/lib/playerdb";
import { SearchBar } from "@/components/search-bar";
import { PlayerCard } from "@/components/player-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { StateMessage } from "@/components/state-message";

const PRESETS: Array<{ label: string; username: string; platform: PlayerPlatform }> = [
  { label: "Minecraft · Notch", username: "Notch", platform: "minecraft" },
  { label: "Xbox · Ninja", username: "Ninja", platform: "xbox" },
];

export default function Home() {
  const [platform, setPlatform] = useState<PlayerPlatform>(PLAYER_PLATFORMS[0].id);
  const [query, setQuery] = useState("");
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const platformLookup = useMemo(
    () => Object.fromEntries(PLAYER_PLATFORMS.map((item) => [item.id, item.label])),
    [],
  );

  const handleLookup = (desiredQuery = query, desiredPlatform = platform) => {
    const safeQuery = desiredQuery.trim();
    if (!safeQuery) {
      setError("Enter a username to search.");
      setPlayer(null);
      return;
    }

    startTransition(() => {
      fetchPlayerProfile(safeQuery, desiredPlatform)
        .then((profile) => {
          setPlayer(profile);
          setError(null);
        })
        .catch((cause: unknown) => {
          const message =
            cause instanceof Error && cause.message
              ? cause.message
              : "We could not find that player.";
          setError(message);
          setPlayer(null);
        });
    });
  };

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    setQuery(preset.username);
    setPlatform(preset.platform);
    handleLookup(preset.username, preset.platform);
  };

  const showEmptyState = !player && !error && !isPending;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_50%)]" />
        <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 pb-16 pt-12 sm:px-10">
          <header className="space-y-4 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-sky-200/80">
              PlayerDB Radar
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Search gamer profiles instantly
            </h1>
            <p className="text-base text-white/70 sm:text-lg">
              Plug into PlayerDB.co and get avatars, UUIDs, and public stats for Minecraft, Xbox,
              PlayStation, Steam, and more — all from a single lookup panel.
            </p>
          </header>

          <section>
            <SearchBar
              query={query}
              platform={platform}
              loading={isPending}
              onQueryChange={setQuery}
              onPlatformChange={setPlatform}
              onSubmit={() => handleLookup()}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/50">
              <span className="text-[0.65rem]">Sample lookups</span>
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="rounded-full border border-white/15 px-4 py-1 text-[0.65rem] font-semibold tracking-[0.4em] text-white/80 transition hover:border-white/40 hover:text-white"
                  onClick={() => handlePreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            {isPending && <LoadingSkeleton />}
            {error && !isPending && (
              <StateMessage
                variant="error"
                title="Lookup failed"
                description={error}
              />
            )}
            {player && !isPending && <PlayerCard player={player} />}
            {showEmptyState && (
              <StateMessage
                title="Awaiting your first lookup"
                description="Search any supported network to visualize public stats and linked accounts."
              />
            )}
          </section>

          {player && !isPending && (
            <footer className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              <p>
                Showing live data from PlayerDB for
                <span className="mx-1 font-semibold text-white">{player.username}</span>on
                {" "}
                <span className="font-semibold text-white">
                  {platformLookup[player.platform] ?? player.platform}
                </span>
                .
              </p>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

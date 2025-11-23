"use client";

import { useId } from "react";
import { PLAYER_PLATFORMS, PlayerPlatform } from "@/lib/playerdb";

type SearchBarProps = {
  query: string;
  platform: PlayerPlatform;
  onQueryChange: (value: string) => void;
  onPlatformChange: (value: PlayerPlatform) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export function SearchBar({
  query,
  platform,
  onQueryChange,
  onPlatformChange,
  onSubmit,
  loading,
}: SearchBarProps) {
  const inputId = useId();

  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor={inputId} className="text-sm font-semibold uppercase tracking-wide text-white/70">
        Player Lookup
      </label>
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <input
            id={inputId}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Enter username, UUID, or ID"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-white/40">
            {query ? "Search" : "Ready"}
          </span>
        </div>
        <div className="flex min-w-[180px] gap-3">
          <select
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value as PlayerPlatform)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-medium text-white focus:border-white/40 focus:outline-none"
          >
            {PLAYER_PLATFORMS.map((item) => (
              <option key={item.id} value={item.id} className="text-slate-900">
                {item.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Spinner /> : "Lookup"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"
      aria-label="Loading"
    />
  );
}

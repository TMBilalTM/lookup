# Player Lookup Radar

> Instant multi-platform gamer lookup powered by [PlayerDB.co](https://playerdb.co) and Next.js 14.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [PlayerDB Integration](#playerdb-integration)
- [UI Components](#ui-components)
- [Customization Tips](#customization-tips)
- [Troubleshooting](#troubleshooting)
- [Roadmap Ideas](#roadmap-ideas)

## Features
- **Unified search** – Look up Minecraft (Java & Bedrock), Xbox Live, PlayStation, and Steam profiles from a single panel.
- **Realtime feedback** – Loading skeletons, empty states, and graceful error cards keep the UX informative.
- **Rich metadata** – UUIDs, avatars, account tiers, gamer scores, and linked accounts are normalized and displayed consistently.
- **Modern visuals** – App Router + Tailwind CSS v4 theme, Geist fonts, and glassmorphism accents for a premium feel.
- **Preset discoveries** – One-click demo buttons (e.g., Notch, Ninja) show how the UI behaves with real data.

## Tech Stack
- Next.js 16 (App Router, React Compiler enabled)
- TypeScript + strict mode + path aliases (`@/*`)
- Tailwind CSS v4 (inline theme tokens) + custom `globals.css`
- PlayerDB public REST API

## Architecture Overview
- `src/app/page.tsx` orchestrates client-side state: query input, platform selector, async lookup with `useTransition`.
- `src/lib/playerdb.ts` wraps PlayerDB with typed payloads, normalization helpers, platform registry, and avatar fallbacks.
- `src/components/*` houses reusable presentation blocks (search bar, cards, skeletons, state messages) to keep the page lean.
- `next.config.ts` whitelists remote image hosts (Crafthead, Xbox Live, DiceBear, PlayerDB) so avatars render through `next/image`.

## Getting Started
### Prerequisites
- Node.js 20+
- npm 10+ (other package managers work but npm lockfile is committed)

### Installation
```bash
npm install
npm run dev
# visit http://localhost:3000
```

To lint or build the production bundle:
```bash
npm run lint
npm run build
```

## Available Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development mode with Turbopack |
| `npm run lint` | Run ESLint (Next.js config + TypeScript aware rules) |
| `npm run build` | Create the optimized production bundle |
| `npm start` | Serve the output from `.next` after building |

## PlayerDB Integration
- Endpoint pattern: `https://playerdb.co/api/player/{platform}/{usernameOrId}` with `cache: "no-store"` for freshness.
- Supported platforms live in `PLAYER_PLATFORMS`. Updating the array automatically updates dropdown labels and normalization logic.
- Sample lookup:

```ts
const profile = await fetchPlayerProfile("Notch", "minecraft");
console.log(profile.username, profile.meta);
```

### Response Shape (simplified)
```json
{
	"username": "Notch",
	"id": "069a79f4-44e9-4726-a5be-fca90e38aaf5",
	"avatar": "https://crafthead.net/avatar/069a...",
	"platform": "minecraft",
	"meta": {
		"Gamerscore": "10662",
		"Account Tier": "Gold"
	},
	"accounts": [
		{ "service": "Xbox Live", "username": "Ninja" }
	]
}
```

## UI Components
- `SearchBar` – Username input, platform selector, CTA button, and preset chips.
- `PlayerCard` – Avatar, platform badge, IDs, linked accounts list, and metadata grid.
- `PlayerStats` – Responsive stat tiles fed from normalized metadata.
- `LoadingSkeleton` – Glassy placeholder for first paint and suspense-like feedback.
- `StateMessage` – Shared empty/error presentation with icon slot.

## Customization Tips
1. **Add another platform** – Append to `PLAYER_PLATFORMS`, then allow its avatar host inside `next.config.ts` if needed.
2. **Persist history** – Lift search state into a server action or local storage hook and render a timeline alongside the card.
3. **Proxy PlayerDB** – Create an API route under `src/app/api` to add caching, API keys, or rate-limit protection.
4. **Expand stats** – Hydrate `player.meta` with derived values (e.g., days since account creation) before passing to `PlayerStats`.

## Troubleshooting
- **No avatar shown** – Confirm the avatar domain is present in `next.config.ts > images.remotePatterns` and re-run `npm run dev`.
- **Rate limited** – PlayerDB has per-IP limits; add a lightweight server proxy with caching if you expect heavy usage.
- **Workspace root warning** – Next.js may warn about multiple lockfiles on Windows. Remove the extra lockfile in `C:\Users\BilalTM` or set `turbopack.root` in `next.config.ts`.

## Roadmap Ideas
1. Dark/light theme toggle with `next-themes`.
2. Player comparison mode for esports scouting.
3. Export to shareable cards (PNG/OG image) using Vercel OG or react-email.
4. Server actions that track lookup analytics for real-time insights.

---

Happy hacking! If you build something on top of Player Lookup Radar, share it so others can explore new player networks.

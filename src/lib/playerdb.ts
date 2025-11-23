const PLAYERDB_BASE_URL = "https://playerdb.co/api/player";

export const PLAYER_PLATFORMS = [
  { id: "minecraft", label: "Minecraft Java" },
  { id: "bedrock", label: "Minecraft Bedrock" },
  { id: "xbox", label: "Xbox Live" },
  { id: "psn", label: "PlayStation Network" },
  { id: "steam", label: "Steam" },
] as const;

export type PlayerPlatform = (typeof PLAYER_PLATFORMS)[number]["id"];

export type PlayerAccount = {
  id: string;
  service?: string;
  username?: string;
  link?: string;
  extra?: Record<string, string>;
};

export type PlayerProfile = {
  username: string;
  id?: string;
  rawId?: string;
  avatar?: string;
  platform: PlayerPlatform;
  meta: Record<string, string>;
  accounts: PlayerAccount[];
};

type PlayerDbResponse = {
  success: boolean;
  message: string;
  data?: {
    player: RawPlayer;
  };
};

type RawPlayer = {
  username: string;
  id?: string;
  raw_id?: string;
  avatar?: string;
  meta?: {
    accounts?: RawAccount[];
    [key: string]: unknown;
  };
  accounts?: RawAccount[];
};

type RawAccount = {
  id?: string | number;
  username?: string;
  service?: string;
  url?: string;
  [key: string]: unknown;
};

export async function fetchPlayerProfile(
  username: string,
  platform: PlayerPlatform,
): Promise<PlayerProfile> {
  const trimmed = username.trim();
  if (!trimmed) {
    throw new Error("Enter a username to search.");
  }

  const url = `${PLAYERDB_BASE_URL}/${platform}/${encodeURIComponent(trimmed)}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Unable to reach PlayerDB right now.");
  }

  const payload = (await res.json()) as PlayerDbResponse;

  if (!payload.success || !payload.data?.player) {
    throw new Error(payload.message || "Player not found.");
  }

  return normalizePlayer(payload.data.player, platform);
}

function normalizePlayer(player: RawPlayer, platform: PlayerPlatform): PlayerProfile {
  return {
    username: player.username,
    id: player.id,
    rawId: player.raw_id,
    avatar: player.avatar ?? buildFallbackAvatar(player.username),
    platform,
    meta: sanitizeMeta(player.meta),
    accounts: extractAccounts(player),
  };
}

function sanitizeMeta(meta: RawPlayer["meta"]) {
  if (!meta) return {} as Record<string, string>;

  return Object.entries(meta).reduce<Record<string, string>>((acc, [key, value]) => {
    const parsed = formatValue(value);
    if (parsed) {
      acc[prettifyKey(key)] = parsed;
    }
    return acc;
  }, {});
}

function extractAccounts(player: RawPlayer): PlayerAccount[] {
  const accounts = Array.from(player.accounts ?? []);

  const metaAccounts = Array.isArray(player.meta?.accounts)
    ? player.meta?.accounts
    : [];

  return [...accounts, ...metaAccounts]
    .map((account, index) => {
      const id = account.id ?? account.username ?? `account-${index}`;
      return {
        id: String(id),
        service: typeof account.service === "string" ? account.service : undefined,
        username: typeof account.username === "string" ? account.username : undefined,
        link: typeof account.url === "string" ? account.url : undefined,
        extra: buildExtra(account),
      } satisfies PlayerAccount;
    })
    .filter((account, index, array) =>
      index === array.findIndex((candidate) => candidate.id === account.id),
    );
}

function buildExtra(account: RawAccount): Record<string, string> | undefined {
  const extras = Object.entries(account).reduce<Record<string, string>>((acc, [key, value]) => {
    if (["id", "username", "service", "url"].includes(key)) {
      return acc;
    }
    const parsed = formatValue(value);
    if (parsed) {
      acc[prettifyKey(key)] = parsed;
    }
    return acc;
  }, {});

  return Object.keys(extras).length ? extras : undefined;
}

function formatValue(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "bigint") return value.toString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    const filtered = value.map((item) => formatValue(item)).filter(Boolean) as string[];
    return filtered.length ? filtered.join(", ") : undefined;
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return undefined;
}

function prettifyKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (char) => char.toUpperCase())
    .trim();
}

function buildFallbackAvatar(username: string) {
  const seed = encodeURIComponent(username);
  return `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${seed}`;
}

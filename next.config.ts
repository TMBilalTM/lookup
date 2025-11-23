import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "crafthead.net" },
      { protocol: "https", hostname: "textures.minecraft.net" },
      { protocol: "https", hostname: "avatar-ssl.xboxlive.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "playerdb.co" },
      { protocol: "https", hostname: "avatars.steamstatic.com" },

    ],
  },
};

export default nextConfig;

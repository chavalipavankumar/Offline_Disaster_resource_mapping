import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "osm-tile-cache",
      expiration: {
        maxEntries: 5000,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /^https?.*/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "http-fallback-cache",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
];

const withPWA = withPWAInit({
  dest: "public",
  disable: false, // User prefers having offline PWA active during Dev mode despite HMR console warnings.
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);

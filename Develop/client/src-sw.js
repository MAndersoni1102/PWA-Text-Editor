const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
precacheAndRoute(self.__WB_MANIFEST);
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
offlineFallback({
  pageFallback: "/index.html",
  pageFallbackDependencies: ["/index.html"],
  strategy: pageCache,
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
// This register route is used to cache the assets.
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
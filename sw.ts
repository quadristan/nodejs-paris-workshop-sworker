import { getApp } from "./src/service-worker/controller";

declare const self: ServiceWorkerGlobalScope;

const baseFetch = globalThis.fetch.bind(globalThis);

async function handleFetch(event: FetchEvent) {
  console.log(`Handling ${event.request.method} ${event.request.url}`);
  const app = await getApp();
  const result = await app.fetch(
    event.request,
    {},
    {
      waitUntil: event.waitUntil,
      passThroughOnException: () => {},
      props: {},
    },
  );
  if (result.status === 404) {
    return await baseFetch(event.request);
  } else {
    return result;
  }
}

handleFetch({
  request: new Request("/sw/count", { method: "GET" }),
} satisfies Partial<FetchEvent> as unknown as FetchEvent);

self.addEventListener("activate", () => {
  console.log("SW activated");
});

self.addEventListener("fetch", (evt) => evt.respondWith(handleFetch(evt)));

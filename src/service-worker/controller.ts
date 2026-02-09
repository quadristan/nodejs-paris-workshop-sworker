import { Hono } from "hono";
import { createCountService } from "./count-service";

let _app: Promise<Hono>;

const createApp = async () => {
  const app = new Hono();

  const countService = await createCountService();

  app.get("/sw/hello-world", (c) => c.json({ hello: "world" }));

  app.get("/sw/count", async (c) =>
    c.json({ count: await countService.get() }),
  );
  app.post("/sw/count/increase", async (c) => {
    await countService.increase();
    return c.newResponse(null, 204);
  });
  return app;
};

export const getApp = () => {
  if (!_app) {
    _app = new Promise((resolve, reject) => {
      createApp().then(resolve, reject);
    });
  }
  return _app;
};

import { createDb } from "./index-db";
import { Mutex } from "async-mutex";

const KEY = "counter";
export const createCountService = async () => {
  const store = await createDb();
  const mutex = new Mutex();

  const get = async () => {
    return await store.get(KEY, 0);
  };

  const set = async (v: number) => {
    await store.set(KEY, v);
  };

  const increase = async () => {
    await mutex.runExclusive(async () => {
      await set(1 + (await get()));
    });
  };

  return { get, increase };
};

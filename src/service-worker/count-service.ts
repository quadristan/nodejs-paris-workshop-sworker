// import { createDb } from "./index-db";
import { Mutex } from "async-mutex";

// const KEY = "counter";
export const createCountService = async () => {
  // const _store = await createDb();
  const mutex = new Mutex();
  let count = 0;

  const get = async () => {
    return count;
  };

  const set = async (v: number) => {
    count = v;
  };

  const increase = async () => {
    await mutex.runExclusive(async () => {
      await set(1 + (await get()));
    });
  };

  return { get, increase };
};

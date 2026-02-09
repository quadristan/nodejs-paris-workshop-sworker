import { openDB } from "idb";

const STORENAME = "store";

export const createDb = async () => {
  const db = await openDB("sw-worker", 1, {
    upgrade(db) {
      db.createObjectStore(STORENAME);
    },
  });

  const set = async (key: string, value: unknown) => {
    const tx = db.transaction(STORENAME, "readwrite");
    const store = tx.objectStore(STORENAME);
    await store.put(value, key);
    await tx.done;
  };

  const get = async <T>(key: string, defaultValue: T) => {
    const store = db.transaction(STORENAME, "readonly").objectStore(STORENAME);
    return ((await store.get(key)) as T) ?? defaultValue;
  };

  return { get, set };
};

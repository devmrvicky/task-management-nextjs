const DB_NAME = "manage_tasks";
const storeNames: storeName[] = ["todo_cards", "todos", "notes", "folders"];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      console.log("creating object store");
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      storeNames.forEach((storeName: storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: "id",
            // autoIncrement: false,
          });
        }
      });
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export async function getAllData({ storeName }: {storeName: storeName}): Promise<any[]> {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction([storeName], "readonly");
    const store: IDBObjectStore = transaction.objectStore(storeName);
    const request: IDBRequest<any[]> = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function updateData({ data, storeName }: {data: Data, storeName: storeName}) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction([storeName], "readwrite");
    const store: IDBObjectStore = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function deleteData({ id, storeName }: {id: IDBValidKey | IDBKeyRange, storeName: storeName}): Promise<unknown> {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    // console.log(request);

    request.onsuccess = () => {
      console.log(`id: ${id}: deleted`);
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}


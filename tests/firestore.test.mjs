import { before, after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, connectFirestoreEmulator, terminate, disableNetwork, enableNetwork } from "firebase/firestore";

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Start the Firestore emulator before running these tests");
}

const projectId = "demo-week-10";
const validItem = { name: "Milk", quantity: 1, category: "dairy" };
let environment;
let service;
let serviceDb;

before(async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: { rules: await readFile(new URL("../firestore.rules", import.meta.url), "utf8") },
  });
  Object.assign(process.env, {
    NEXT_PUBLIC_FIREBASE_API_KEY: "demo-key",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo-week-10.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "demo-week-10.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "123",
    NEXT_PUBLIC_FIREBASE_APP_ID: "demo-app",
  });
  ({ db: serviceDb } = await import("../app/week-10/_utils/firebase.js"));
  const [host, port] = process.env.FIRESTORE_EMULATOR_HOST.split(":");
  connectFirestoreEmulator(serviceDb, host, Number(port), { mockUserToken: { sub: "joaquin" } });
  service = await import("../app/week-10/_services/shopping-list-service.js");
});

beforeEach(async () => { await environment.clearFirestore(); });
after(async () => {
  if (serviceDb) await terminate(serviceDb);
  if (environment) await environment.cleanup();
});

function itemsFor(authenticatedUser, owner = authenticatedUser) {
  const db = authenticatedUser
    ? environment.authenticatedContext(authenticatedUser).firestore()
    : environment.unauthenticatedContext().firestore();
  return collection(db, "users", owner, "items");
}

test("I can save, reload, update and delete my own groceries", async () => {
  const items = itemsFor("joaquin");
  const item = doc(items, "milk");
  await assertSucceeds(setDoc(item, validItem));
  assert.equal((await assertSucceeds(getDoc(item))).data().name, "Milk");
  assert.equal((await assertSucceeds(getDocs(items))).size, 1);
  await assertSucceeds(updateDoc(item, { quantity: 20 }));
  await assertSucceeds(deleteDoc(item));
});

test("signed-out visitors and other accounts cannot access my groceries", async () => {
  await setDoc(doc(itemsFor("joaquin"), "milk"), validItem);
  for (const visitor of [null, "classmate"]) {
    const items = itemsFor(visitor, "joaquin");
    const item = doc(items, "milk");
    await assertFails(getDocs(items));
    await assertFails(getDoc(item));
    await assertFails(setDoc(doc(items, "new"), validItem));
    await assertFails(updateDoc(item, { quantity: 2 }));
    await assertFails(deleteDoc(item));
  }
});

test("invalid fields are rejected on both create and update", async () => {
  const items = itemsFor("joaquin");
  const existing = doc(items, "existing");
  await setDoc(existing, validItem);
  const invalidItems = [
    { ...validItem, name: "" }, { ...validItem, name: "   " },
    { ...validItem, name: "a".repeat(51) }, { ...validItem, name: 7 },
    { ...validItem, quantity: 0 }, { ...validItem, quantity: 21 },
    { ...validItem, quantity: 1.5 }, { ...validItem, quantity: "1" },
    { ...validItem, category: "unknown" }, { ...validItem, category: [] },
    { ...validItem, extra: true }, { ...validItem, id: "local-id" },
    { name: "Milk", quantity: 1 },
  ];
  for (const [index, item] of invalidItems.entries()) {
    await assertFails(setDoc(doc(items, `invalid-${index}`), item));
    await assertFails(setDoc(existing, item));
  }
});

test("all eleven categories and name boundaries are allowed", async () => {
  const items = itemsFor("joaquin");
  const categories = ["produce", "dairy", "bakery", "meat", "frozen foods", "canned goods", "dry goods", "beverages", "snacks", "household", "other"];
  for (const category of categories) {
    await assertSucceeds(setDoc(doc(items, category), { name: "a".repeat(50), quantity: 20, category }));
  }
  await assertSucceeds(setDoc(doc(items, "short"), { ...validItem, name: "a" }));
});

test("unrelated collections and user documents stay private", async () => {
  const db = environment.authenticatedContext("joaquin").firestore();
  for (const path of ["users/joaquin", "other/document"]) {
    await assertFails(setDoc(doc(db, path), validItem));
    await assertFails(getDoc(doc(db, path)));
  }
});

test("the Week 10 service saves only item fields and returns persistent document ids", async () => {
  assert.deepEqual(await service.getItems("joaquin"), []);
  const id = await service.addItem("joaquin", { ...validItem, id: "discard-this-id", extra: true });
  assert.equal(typeof id, "string");
  assert.notEqual(id, "discard-this-id");
  const reloaded = await service.getItems("joaquin");
  assert.deepEqual(reloaded, [{ ...validItem, id }]);
  const stored = await getDoc(doc(itemsFor("joaquin"), id));
  assert.deepEqual(stored.data(), validItem);
  await assert.rejects(service.getItems("classmate"));
  await assert.rejects(service.addItem("classmate", validItem));
  await assert.rejects(service.getItems(""));
  await assert.rejects(service.deleteItem("classmate", id));
  await service.deleteItem("joaquin", id);
  assert.deepEqual(await service.getItems("joaquin"), []);
  assert.equal((await getDoc(doc(itemsFor("joaquin"), id))).exists(), false);
  await assert.rejects(service.deleteItem("joaquin", ""));
});


test("an offline cache is not shown as a confirmed saved list", async () => {
  await service.getItems("joaquin");
  await disableNetwork(serviceDb);
  try {
    await assert.rejects(service.getItems("joaquin"));
  } finally {
    await enableNetwork(serviceDb);
  }
});

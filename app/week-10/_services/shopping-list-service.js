import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "../_utils/firebase.js";

function itemsCollection(userId) {
  if (!db) throw new Error("Firebase is not configured");
  if (!userId) throw new Error("Sign in before opening your groceries");
  return collection(db, "users", userId, "items");
}

export async function getItems(userId) {
  const snapshot = await getDocs(query(itemsCollection(userId)));
  // I wait for the server before showing the saved list
  if (snapshot.metadata.fromCache) throw new Error("The saved list could not be confirmed with Firebase");
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function addItem(userId, { name, quantity, category }) {
  // I only save the fields the list needs
  const document = await addDoc(itemsCollection(userId), { name, quantity, category });
  return document.id;
}

export async function deleteItem(userId, itemId) {
  if (!itemId) throw new Error("Choose an item to remove");
  await deleteDoc(doc(itemsCollection(userId), itemId));
}

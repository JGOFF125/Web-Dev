import { collection, getDocs, addDoc, query } from "firebase/firestore";
import { db } from "../_utils/firebase.js";

function itemsCollection(userId) {
  if (!db) throw new Error("Firebase is not configured");
  if (!userId) throw new Error("Sign in before opening your groceries");
  return collection(db, "users", userId, "items");
}

export async function getItems(userId) {
  const snapshot = await getDocs(query(itemsCollection(userId)));
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function addItem(userId, { name, quantity, category }) {
  // I only save the fields the list needs
  const document = await addDoc(itemsCollection(userId), { name, quantity, category });
  return document.id;
}

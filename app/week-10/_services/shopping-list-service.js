import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Gets all items saved under users/{userId}/items
export async function getItems(userId) {
  const items = [];
  const itemsRef = collection(db, "users", userId, "items");
  const snapshot = await getDocs(query(itemsRef));

  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
}

// Adds one item under users/{userId}/items and returns its new id
export async function addItem(userId, item) {
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);
  return docRef.id;
}
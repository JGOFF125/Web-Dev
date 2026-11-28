import { db } from "../_utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function getItems(userId) {
    const itemsCollection = collection(db, "users", userId, "items");
    const itemsSnapshot = await getDocs(itemsCollection);

    return itemsSnapshot.docs.map((itemDoc) => ({
        ...itemDoc.data(),
        id: itemDoc.id,
    }));
}

export async function addItem(userId, item) {
    const itemsCollection = collection(db, "users", userId, "items");
    const newItemRef = await addDoc(itemsCollection, item);
    return {
        ...item,
        id: newItemRef.id,
    };
}
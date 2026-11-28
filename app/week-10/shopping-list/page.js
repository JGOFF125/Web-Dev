"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import { MealIdeas } from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
    const { user } = useUserAuth();
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // Load the saved items once the user is logged in
    useEffect(() => {
        if (!user) return;

        async function loadItems() {
            try {
                const savedItems = await getItems(user.uid);
                setItems(savedItems);
            } catch (error) {
                console.error("Could not load items:", error);
            }
        }

        loadItems();
    }, [user]);

    async function handleAddItem(newItem) {
        // Remove the temporary id from NewItem. Firestore gives us the real one.
        const { id, ...itemData } = newItem;
        try {
            const newId = await addItem(user.uid, itemData);
            setItems((currentItems) => [...currentItems, { id: newId, ...itemData }]);
        } catch (error) {
            console.error("Could not add item:", error);
        }
    }

    function handleItemSelect(item) {
        setSelectedItemId(item.id);
    }

    const selectedItem = items.find((item) => item.id === selectedItemId);

    if (!user) {
        return (
            <main className="min-h-screen bg-[#ddf6fe] p-8 text-black">
                <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 text-center shadow-md">
                    <p className="mb-4 text-lg text-gray-900">
                        You must be logged in to view this page.
                    </p>
                    <Link
                        href="/week-10"
                        className="inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700"
                    >
                        Go to Login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#ddf6fe] p-8 text-black">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Shopping List</h1>
                <NewItem onAddItem={handleAddItem} />
                <ItemList
                    items={items}
                    onItemSelect={handleItemSelect}
                    selectedItemId={selectedItemId}
                />
                {selectedItem && (
                    <MealIdeas
                        key={selectedItem.id}
                        ingredient={selectedItem.name.split(",")[0].trim()}
                    />
                )}
            </div>
        </main>
    );
}
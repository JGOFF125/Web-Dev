"use client"

import { useState } from "react";
import Link from "next/link"; 
import { useUserAuth } from "../_utils/auth-context"; 
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import { MealIdeas } from "./meal-ideas";

export default function Page() {
    const { user } = useUserAuth(); 
    const [items, setItems] = useState(itemsData);
    const [selectedItemId, setSelectedItemId] = useState(null);

    function handleAddItem(newItem) {
        setItems((currentItems) => [...currentItems, newItem]);
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
                        href="/week-9"
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
"use client"

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import { MealIdeas } from "./meal-ideas";

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [selectedItemId, setSelectedItemId] = useState(null);

    function handleAddItem(newItem) {
        setItems((currentItems) => [...currentItems, newItem]);
    }

    function handleItemSelect(item) {
        setSelectedItemId(item.id);
    }

    const selectedItem = items.find((item) => item.id === selectedItemId);

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
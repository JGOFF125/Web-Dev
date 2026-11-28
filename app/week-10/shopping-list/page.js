"use client"

import { useEffect, useState } from "react";
import { MealIdeas } from "./meal-ideas";
import NewItem from "./new-item";
import ItemList from "./item-list";
import { useUserAuth } from "../_utils/auth-context";
import { addItem, getItems } from "../_services/shopping-list-service";

export default function Page() {
    const { user } = useUserAuth();
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        async function loadItems() {
            if (!user?.uid) {
                setItems([]);
                return;
            }

            const userItems = await getItems(user.uid);
            setItems(userItems);
        }

        loadItems();
    }, [user?.uid]);

    async function handleAddItem(newItem) {
        if (!user?.uid) return;

        const savedItem = await addItem(user.uid, newItem);
        setItems((currentItems) => [...currentItems, savedItem]);
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
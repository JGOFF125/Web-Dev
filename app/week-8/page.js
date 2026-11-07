"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  // The list now lives here so both components can use it
  const [items, setItems] = useState(itemsData);

  // Holds the cleaned-up name of the item the user clicked
  const [selectedItemName, setSelectedItemName] = useState("");

  // Adds the new item to a copy of the list instead of changing the old one
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Cleans the item name so the MealDB API can understand it
  const handleItemSelect = (item) => {
    const cleanName = item.name
      .split(",")[0]
      .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
      .trim();
    setSelectedItemName(cleanName);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4">
      <h1 className="text-3xl font-bold text-emerald-400 m-2">Shopping List</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="m-2">
            <NewItem onAddItem={handleAddItem} />
          </div>
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="m-2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
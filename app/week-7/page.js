"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  // The list now lives here so both components can use it
  const [items, setItems] = useState(itemsData);

  // Adds the new item to a copy of the list instead of changing the old one
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4">
      <h1 className="text-3xl font-bold text-emerald-400 m-2">Shopping List</h1>
      <div className="m-2">
        <NewItem onAddItem={handleAddItem} />
      </div>
      <ItemList items={items} />
    </main>
  );
}
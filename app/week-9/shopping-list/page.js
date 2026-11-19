"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleItemSelect(item) {
    const cleanedName = item.name
      .split(",")[0]
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
      .trim();
    setSelectedItemName(cleanedName);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-lg text-emerald-900">
          You must be logged in to view this page.
        </p>
        <Link href="/week-9" className="text-emerald-700 underline">
          Go to the login page
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-emerald-900">
        Shopping List
      </h1>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
        <div className="flex w-full max-w-md flex-col gap-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const buttons = (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => setSortBy("name")}
        className={`rounded-lg px-4 py-2 font-medium ${
          sortBy === "name"
            ? "bg-emerald-600 text-white"
            : "border border-emerald-200 bg-white text-emerald-700"
        }`}
      >
        Sort by Name
      </button>
      <button
        onClick={() => setSortBy("category")}
        className={`rounded-lg px-4 py-2 font-medium ${
          sortBy === "category"
            ? "bg-emerald-600 text-white"
            : "border border-emerald-200 bg-white text-emerald-700"
        }`}
      >
        Sort by Category
      </button>
      <button
        onClick={() => setSortBy("grouped")}
        className={`rounded-lg px-4 py-2 font-medium ${
          sortBy === "grouped"
            ? "bg-emerald-600 text-white"
            : "border border-emerald-200 bg-white text-emerald-700"
        }`}
      >
        Group by Category
      </button>
    </div>
  );

  if (sortBy === "grouped") {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(grouped).sort();

    return (
      <div className="w-full max-w-md">
        {buttons}
        {sortedCategories.map((category) => (
          <div key={category} className="mb-4">
            <h2 className="mb-2 text-lg font-bold capitalize text-emerald-900">
              {category}
            </h2>
            <ul className="flex flex-col gap-2">
              {[...grouped[category]]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect(item)}
                  />
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="w-full max-w-md">
      {buttons}
      <ul className="flex flex-col gap-2">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}
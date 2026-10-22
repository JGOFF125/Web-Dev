"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  if (sortBy === "grouped") {
    const grouped = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(grouped).sort();

    return (
      <div className="w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSortBy("name")}
            className="px-4 py-2 rounded-lg font-medium bg-white text-emerald-700 border border-emerald-200"
          >
            Sort by Name
          </button>
          <button
            onClick={() => setSortBy("category")}
            className="px-4 py-2 rounded-lg font-medium bg-white text-emerald-700 border border-emerald-200"
          >
            Sort by Category
          </button>
          <button
            onClick={() => setSortBy("grouped")}
            className="px-4 py-2 rounded-lg font-medium bg-emerald-600 text-white"
          >
            Group by Category
          </button>
        </div>

        {sortedCategories.map((category) => (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-bold text-emerald-900 capitalize mb-2">
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
    } else {
      return a.category.localeCompare(b.category);
    }
  });

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-lg font-medium ${
            sortBy === "name"
              ? "bg-emerald-600 text-white"
              : "bg-white text-emerald-700 border border-emerald-200"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-lg font-medium ${
            sortBy === "category"
              ? "bg-emerald-600 text-white"
              : "bg-white text-emerald-700 border border-emerald-200"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("grouped")}
          className="px-4 py-2 rounded-lg font-medium bg-white text-emerald-700 border border-emerald-200"
        >
          Group by Category
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}
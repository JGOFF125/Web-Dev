"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // Copy the list so the original data stays the same
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    }

    return a.name.localeCompare(b.name);
  });

  // Put items with the same category together
  const groupedItems = sortedItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);
    return groups;
  }, {});

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Sort shopping list">
        <span className="mr-2 font-semibold text-stone-700">Sort by:</span>
        {[
          { value: "name", label: "Name" },
          { value: "category", label: "Category" },
          { value: "group", label: "Group by category" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSortBy(option.value)}
            aria-pressed={sortBy === option.value}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-amber-800 ${
              sortBy === option.value
                ? "bg-amber-800 text-white"
                : "bg-stone-200 text-stone-800 hover:bg-stone-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {sortBy === "group" ? (
        <div className="space-y-6">
          {Object.keys(groupedItems).sort().map((category) => (
            <section key={category}>
              <h2 className="border-b border-stone-300 pb-2 text-xl font-bold capitalize text-amber-800">
                {category}
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {groupedItems[category].map((item) => (
                  <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {sortedItems.map((item) => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))}
        </ul>
      )}
    </div>
  );
}

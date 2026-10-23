"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // Copy the items prop first so sort() never changes the parent's state
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Builds new arrays for each category, so the prop is never touched
  const groupedItems = sortedItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});

  const buttonStyle = (value) =>
    `p-1 m-2 w-36 rounded-md font-semibold ${
      sortBy === value
        ? "bg-emerald-500 text-slate-950"
        : "bg-slate-700 text-white hover:bg-slate-600"
    }`;

  return (
    <div>
      <div className="flex items-center m-2 text-white">
        <span className="mr-2">Sort by:</span>
        <button onClick={() => setSortBy("name")} className={buttonStyle("name")}>
          Name
        </button>
        <button onClick={() => setSortBy("category")} className={buttonStyle("category")}>
          Category
        </button>
        <button onClick={() => setSortBy("grouped")} className={buttonStyle("grouped")}>
          Grouped Category
        </button>
      </div>

      {sortBy === "grouped" ? (
        Object.keys(groupedItems)
          .sort()
          .map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-emerald-400 capitalize m-2">
                {category}
              </h2>
              <ul>
                {[...groupedItems[category]]
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
          ))
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
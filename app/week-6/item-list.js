"use client"

import Item from "./item";
import itemsData from "./items.json";
import { useState } from "react";

export default function SortBy() {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...itemsData].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
    });

    const groupedItems = sortedItems.reduce((groups, item) => {
        const group = item.category;
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    }, {});

    return (
        <div>
            <div className="space-x-3 mb-4">
                <button onClick={() => setSortBy("name")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-50 text-center py-2 px-4 rounded mb-4">Sort by Name</button>
                <button onClick={() => setSortBy("category")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-50 text-center py-2 px-4 rounded mb-4">Sort by Category</button>
                <button onClick={() => setSortBy("group")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-50 text-center py-2 px-4 rounded mb-4">Group by Category</button>
            </div>
            <ul className="space-y-4">
                {sortBy !== "group" && sortedItems.map((item, index) => (
                    <Item key={index} name={item.name} category={item.category} quantity={item.quantity} />
                ))}
                {sortBy === "group" && Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                        <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <Item key={index} name={item.name} category={item.category} quantity={item.quantity} />
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>
        </div>
    );
}
"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  // Stops the quantity from going above 20
  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  // Stops the quantity from going below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = { name, quantity, category };
    console.log(item);

    alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        placeholder="Item Name"
        className="w-full rounded-md border border-slate-400 p-3 text-black"
      />

      <div className="my-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-12 rounded-md border border-black px-3 py-1 text-xl font-bold text-black">
            {quantity}
          </span>
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className="rounded-md bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 disabled:bg-slate-300"
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className="rounded-md bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 disabled:bg-slate-300"
          >
            +
          </button>
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-md border border-slate-300 p-3 text-black"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-600 p-3 text-lg text-white hover:bg-emerald-700"
      >
        Add Item
      </button>
    </form>
  );
}
"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  // Stops the value from going above twenty
  function increment() {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  }

  // Stops the value from going below one
  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const item = { name, quantity, category };
    console.log(item);
    alert(`Item: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#d8c9bb] bg-[#fffaf4] p-8 shadow-md">
      <div className="mb-6">
        <label htmlFor="name" className="mb-2 block font-semibold text-[#3d3029]">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="Enter an item name"
          className="w-full rounded-lg border border-[#d8c9bb] bg-white px-4 py-3 text-[#3d3029] focus:outline-2 focus:outline-[#735a4b]"
        />
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#806d60]">
          Item Quantity
        </p>

        <p className="mt-3 text-7xl font-bold text-[#3d3029]">
          {quantity}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={decrement}
          disabled={quantity === 1}
          className="rounded-lg bg-[#735a4b] py-3 text-2xl font-bold text-white transition-colors hover:bg-[#5e493e] disabled:cursor-not-allowed disabled:bg-[#ded5cd] disabled:text-[#9b8d82]"
        >
          −
        </button>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={increment}
          disabled={quantity === 20}
          className="rounded-lg bg-[#b85c3f] py-3 text-2xl font-bold text-white transition-colors hover:bg-[#984a34] disabled:cursor-not-allowed disabled:bg-[#ded5cd] disabled:text-[#9b8d82]"
        >
          +
        </button>
      </div>

      <div className="mt-5 flex justify-between text-sm text-[#806d60]">
        <span>Minimum 1</span>
        <span>Maximum 20</span>
      </div>
      <div className="mt-6">
        <label htmlFor="category" className="mb-2 block font-semibold text-[#3d3029]">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-lg border border-[#d8c9bb] bg-white px-4 py-3 text-[#3d3029] focus:outline-2 focus:outline-[#735a4b]"
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
        className="mt-6 w-full rounded-lg bg-[#735a4b] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#5e493e] focus:outline-2 focus:outline-offset-2 focus:outline-[#735a4b]"
      >
        Add Item
      </button>
    </form>
  );
}

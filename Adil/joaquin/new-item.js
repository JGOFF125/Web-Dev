"use client";

import { useState } from "react";

export default function NewItem() {
  // Quantity starts at one
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

  return (
    <section className="rounded-xl border border-[#d8c9bb] bg-[#fffaf4] p-8 shadow-md">
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
          onClick={decrement}
          disabled={quantity === 1}
          className="rounded-lg bg-[#735a4b] py-3 text-2xl font-bold text-white transition-colors hover:bg-[#5e493e] disabled:cursor-not-allowed disabled:bg-[#ded5cd] disabled:text-[#9b8d82]"
        >
          −
        </button>

        <button
          type="button"
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
    </section>
  );
}
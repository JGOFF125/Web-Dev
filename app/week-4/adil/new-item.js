"use client";

import { useState } from "react";

export default function NewItem() {
  // Quantity starts at 1
  const [quantity, setQuantity] = useState(1);

  // Increase by 1, but never above 20
  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease by 1, but never below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buttonStyle =
    "h-12 w-12 rounded-full bg-[#2f5fd0] text-2xl font-bold text-white hover:bg-[#244aa6] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#9db6ef] disabled:cursor-not-allowed disabled:bg-[#cfd8e2] disabled:text-[#8a99a8]";

  return (
    <section className="rounded-md border border-[#d5e0ea] bg-white p-6">
      <p className="text-sm text-[#5b6b7c]">Quantity</p>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={decrement}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          className={buttonStyle}
        >
          −
        </button>

        <span className="text-5xl font-bold text-[#1d2b3a]">{quantity}</span>

        <button
          type="button"
          onClick={increment}
          disabled={quantity === 20}
          aria-label="Increase quantity"
          className={buttonStyle}
        >
          +
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-[#5b6b7c]">
        Pick a number from 1 to 20
      </p>
    </section>
  );
}

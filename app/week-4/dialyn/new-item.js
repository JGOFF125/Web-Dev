"use client";

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-64">
            <p className="text-slate-400 text-sm mb-3">Quantity</p>

            <div className="flex items-center justify-between">
                <button
                    onClick={decrement}
                    disabled={quantity === 1}
                    className="w-10 h-10 rounded-md bg-emerald-600 text-white text-xl font-bold hover:bg-emerald-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed">
                        -
                        
                    </button>

                    <span className="text-3xl font-semibold text-white">{quantity}</span>
                <button
                    onClick={increment}
                    disabled={quantity === 20}
                    className="w-10 h-10 rounded-md bg-emerald-600 text-white text-xl font-bold hover:bg-emerald-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed">
                        +
                    </button>
            </div>

            <p className="text-slate-500 text-xs mt-3 text-center">Choose between 1 and 20</p>
        </div>
    );
}
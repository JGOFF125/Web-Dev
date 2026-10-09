"use client"

import { useState } from "react";

export default function NewItem() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

     const handleSubmit = (event) => {
        event.preventDefault();

        const newItem = {name, quantity, category};
        console.log(newItem);
        alert(`Item added: ${name}, Quantity: ${quantity}, Category: ${category}`);
        setName("");
        setQuantity(1);
        setCategory("produce");
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="mb-4 text-xl font-bold text-black">Quantity: {quantity}</h2>
            <div>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-400 rounded py-2 px-4 mb-4 text-black"
            />
            </div>
            <div>
                <button
                type="button"
                onClick={increment}
                disabled={quantity === 20}
                className="bg-green-500 hover:bg-green-700 text-white font-bold w-10 text-center py-2 px-4 rounded">
                    +
                </button>
                <button
                type="button"
                onClick={decrement}
                disabled={quantity === 1}
                className="bg-red-500 hover:bg-red-700 text-white font-bold w-10 text-center py-2 px-4 rounded mb-4">
                    -
                </button>
            </div>
            <div>
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-400 rounded py-2 px-4 mb-4 text-black"
                >
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Meat">Meat</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Dry Goods">Dried Goods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
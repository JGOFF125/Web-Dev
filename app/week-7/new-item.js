"use client";

import { useState } from "react";
import styles from "./shopping-list.module.css";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    const item = { id: crypto.randomUUID(), name: name.trim(), quantity, category };
    onAddItem(item);

    // Get the form ready for the next item
    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="item-name">Item name <span aria-hidden="true">*</span></label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="e.g. Apples, coffee, oat milk"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="item-quantity">Quantity</label>
        <div className={styles.quantityControl}>
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity === 1}
          >−</button>
          <output id="item-quantity" aria-live="polite">{quantity}</output>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => Math.min(20, current + 1))}
            disabled={quantity === 20}
          >+</button>
        </div>
        <p className={styles.fieldHint}>Choose between 1 and 20</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="item-category">Category</label>
        <select id="item-category" value={category} onChange={(event) => setCategory(event.target.value)}>
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

      <button type="submit" className={styles.submitButton}>
        <span aria-hidden="true">+</span> Add to list
      </button>
    </form>
  );
}

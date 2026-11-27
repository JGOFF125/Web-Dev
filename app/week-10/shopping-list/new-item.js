"use client";

import { useRef, useState } from "react";
import styles from "./shopping-list.module.css";

export default function NewItem({ onAddItem, disabled = false, saving = false }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const submitting = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (disabled || submitting.current || !name.trim()) return;

    submitting.current = true;
    try {
      const saved = await onAddItem({ name: name.trim(), quantity, category });
      if (!saved) return;

      // I clear the form after the item is saved
      setName("");
      setQuantity(1);
      setCategory("produce");
    } finally {
      submitting.current = false;
    }
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
          disabled={disabled}
          maxLength={50}
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
            disabled={disabled || quantity === 1}
          >−</button>
          <output id="item-quantity" aria-live="polite">{quantity}</output>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => Math.min(20, current + 1))}
            disabled={disabled || quantity === 20}
          >+</button>
        </div>
        <p className={styles.fieldHint}>Choose between 1 and 20</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="item-category">Category</label>
        <select disabled={disabled} id="item-category" value={category} onChange={(event) => setCategory(event.target.value)}>
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

      <button type="submit" disabled={disabled} className={styles.submitButton}>
        <span aria-hidden="true">+</span> {saving ? "Saving…" : "Add to list"}
      </button>
    </form>
  );
}

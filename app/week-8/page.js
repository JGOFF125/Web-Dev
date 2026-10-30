"use client";

import { useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import styles from "./shopping-list.module.css";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [lastAdded, setLastAdded] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  function handleAddItem(item) {
    setItems((currentItems) => [...currentItems, item]);
    setLastAdded(item.name);
  }

  function handleItemSelect(item) {
    // I remove the size and emojis before searching
    const cleanedName = item.name.split(",")[0]
      .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u200d\ufe0f]/gu, "")
      .trim().toLowerCase().replace(/\s+/g, " ");
    const ingredientNames = { "chicken breasts": "chicken breast", bananas: "banana" };
    setSelectedItemName(ingredientNames[cleanedName] || cleanedName);
    setSelectedItemId(item.id);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← All assignments</Link>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Joaquin Urbano · Week 8</p>
            <h1>Shopping List</h1>
            <p className={styles.subtitle}>The essentials for your list, a little inspiration for dinner</p>
          </div>
          <div className={styles.itemCount}>
            <strong>{items.length}</strong>
            <span>items on your list</span>
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.shoppingColumn}>
            <section className={styles.formPanel} aria-labelledby="add-item-heading">
              <p className={styles.eyebrow}>Make a note</p>
              <h2 id="add-item-heading">What do you need?</h2>
              <p className={styles.panelDescription}>Add the essentials, one item at a time</p>
              <NewItem onAddItem={handleAddItem} />
              <p className={styles.notice} role="status">
                {lastAdded ? `${lastAdded} added to your list` : "Your next grocery run starts here"}
              </p>
            </section>
            <section className={styles.listPanel} aria-labelledby="list-heading">
              <div className={styles.listHeader}>
                <div>
                  <p className={styles.eyebrow}>The essentials</p>
                  <h2 id="list-heading">Your groceries</h2>
                  <p className={styles.panelDescription}>Select an item to find something to cook</p>
                </div>
                <span className={styles.listMark} aria-hidden="true">✓</span>
              </div>
              <ItemList items={items} onItemSelect={handleItemSelect} selectedItemId={selectedItemId} />
            </section>
          </div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
        <p className={styles.footer}>Made for the everyday · Items reset when you refresh</p>
      </div>
    </main>
  );
}

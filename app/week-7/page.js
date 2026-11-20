"use client";

import { useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import styles from "./shopping-list.module.css";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [lastAdded, setLastAdded] = useState("");

  // Keep the old items and add the new one
  function handleAddItem(item) {
    setItems((currentItems) => [...currentItems, item]);
    setLastAdded(item.name);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← All assignments</Link>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Joaquin Urbano · Week 7</p>
            <h1>Shopping List</h1>
            <p className={styles.subtitle}>A little planning for your next grocery run</p>
          </div>
          <div className={styles.itemCount}>
            <strong>{items.length}</strong>
            <span>items on your list</span>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.formPanel} aria-labelledby="add-item-heading">
            <p className={styles.eyebrow}>Make a note</p>
            <h2 id="add-item-heading">What do you need?</h2>
            <p className={styles.panelDescription}>Add the essentials, one item at a time</p>
            <NewItem onAddItem={handleAddItem} />
            <p className={styles.notice} role="status" aria-live="polite">
              {lastAdded ? `${lastAdded} added to your list` : "Your next grocery run starts here"}
            </p>
          </aside>

          <section className={styles.listPanel} aria-labelledby="list-heading">
            <div className={styles.listHeader}>
              <div>
                <p className={styles.eyebrow}>The essentials</p>
                <h2 id="list-heading">Your groceries</h2>
              </div>
              <span className={styles.listMark} aria-hidden="true">✓</span>
            </div>
            <ItemList items={items} />
          </section>
        </div>
        <p className={styles.footer}>Made for the everyday · Items reset when you refresh</p>
      </div>
    </main>
  );
}

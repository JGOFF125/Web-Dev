"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import PantryIdeas from "./pantry-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";
import styles from "./shopping-list.module.css";
import { useUserAuth } from "../_utils/auth-context";
import AuthGate from "../_utils/auth-gate";

export default function Page() {
  const { user, loading } = useUserAuth();
  if (loading || !user) return <AuthGate />;
  return <ShoppingList key={user.uid} />;
}

function ShoppingList() {
  const { user, logOut, pending, error } = useUserAuth();
  const [items, setItems] = useState([]);
  const [lastAdded, setLastAdded] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  const [loadingItems, setLoadingItems] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [retry, setRetry] = useState(0);
  const savingRef = useRef(false);
  const active = useRef(false);

  useEffect(() => {
    let cancelled = false;
    active.current = true;

    async function loadItems() {
      try {
        const savedItems = await getItems(user.uid);
        if (!cancelled) {
          setItems(savedItems);
          setLoadError("");
        }
      } catch {
        if (!cancelled) setLoadError("Your groceries could not be loaded — check your connection and try again");
      } finally {
        if (!cancelled) setLoadingItems(false);
      }
    }

    loadItems();
    return () => {
      cancelled = true;
      active.current = false;
    };
  }, [user.uid, retry]);

  async function handleAddItem(item) {
    if (loadingItems || loadError || savingRef.current) return false;
    savingRef.current = true;
    setSaving(true);
    setSaveError("");
    setLastAdded("");
    try {
      const id = await addItem(user.uid, item);
      if (!active.current) return false;
      // I use the id from Firestore for the saved item
      setItems((currentItems) => [...currentItems, { ...item, id }]);
      setLastAdded(item.name);
      return true;
    } catch {
      if (active.current) setSaveError("This item was not saved — your details are still here so you can try again");
      return false;
    } finally {
      savingRef.current = false;
      if (active.current) setSaving(false);
    }
  }

  function handleItemSelect(item) {
    // I remove the size and emojis before searching
    const cleanedName = item.name.split(",")[0]
      .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u200d\ufe0f]/gu, "")
      .trim().toLowerCase().replace(/\s+/g, " ");
    const ingredientNames = { bananas: "banana" };
    setSelectedItemName(ingredientNames[cleanedName] || cleanedName);
    setSelectedItemId(item.id);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.accountBar}>
          <Link href="/week-10" className={styles.backLink}>← My account</Link>
          <button type="button" onClick={logOut} disabled={pending} className={styles.signOutButton}>
            {pending ? "Signing out…" : "Sign out"}
          </button>
        </div>
        {error && <p role="alert" className={styles.authError}>{error}</p>}
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Joaquin Urbano · Week 10</p>
            <h1>Shopping List</h1>
            <p className={styles.subtitle}>The essentials for your list, a little inspiration for dinner</p>
          </div>
          <div className={styles.itemCount}>
            <strong>{loadingItems || loadError ? "—" : items.length}</strong>
            <span>items on your list</span>
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.shoppingColumn}>
            <section className={styles.formPanel} aria-labelledby="add-item-heading">
              <p className={styles.eyebrow}>Make a note</p>
              <h2 id="add-item-heading">What do you need?</h2>
              <p className={styles.panelDescription}>Add the essentials, one item at a time</p>
              <NewItem onAddItem={handleAddItem} disabled={loadingItems || Boolean(loadError) || saving || pending} saving={saving} />
              {saveError && <p role="alert" className={styles.authError}>{saveError}</p>}
              <p className={styles.notice} role="status">
                {lastAdded ? `${lastAdded} added to your list` : loadingItems ? "Opening your saved groceries…" : saving ? "Saving to your account…" : "Your next grocery run starts here"}
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
              {loadingItems ? (
                <p role="status" className={styles.emptyHint}>Loading your groceries…</p>
              ) : loadError ? (
                <div className={styles.loadError}>
                  <p role="alert" className={styles.authError}>{loadError}</p>
                  <button type="button" className={styles.retryButton} onClick={() => {
                    setLoadingItems(true);
                    setRetry((current) => current + 1);
                  }}>Try again</button>
                </div>
              ) : items.length === 0 ? (
                <div className={styles.emptyState}>
                  <h3>A fresh start</h3>
                  <p>Add your first grocery above — it will be here when you come back</p>
                </div>
              ) : (
                <ItemList items={items} onItemSelect={handleItemSelect} selectedItemId={selectedItemId} />
              )}
            </section>
          </div>
          <div className={styles.shoppingColumn}>
            <PantryIdeas items={items} />
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
        <p className={styles.footer}>{loadingItems ? "Opening your list" : loadError ? "Your list is unavailable right now" : "Made for the everyday · Groceries saved to your account"}</p>
      </div>
    </main>
  );
}

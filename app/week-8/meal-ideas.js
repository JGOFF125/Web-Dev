"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./shopping-list.module.css";

async function fetchMealIdeas(ingredient, signal) {
  const query = encodeURIComponent(ingredient.replace(/\s+/g, "_"));
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`, { signal });
  if (!response.ok) throw new Error("The meal service is unavailable right now");
  const data = await response.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!ingredient) return;
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 12000);

    async function loadMealIdeas() {
      setLoading(true);
      setError("");
      setMeals([]);
      try {
        const results = await fetchMealIdeas(ingredient, controller.signal);
        if (active) setMeals(results);
      } catch {
        if (active) setError("I couldn’t load the meal ideas right now — please try again");
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }

    loadMealIdeas();

    // I ignore the old request if another item gets selected
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [ingredient, retryCount]);

  return (
    <section className={styles.mealPanel} aria-labelledby="meal-heading" aria-busy={loading}>
      <div className={styles.listHeader}>
        <div>
          <p className={styles.eyebrow}>A little inspiration</p>
          <h2 id="meal-heading">Meal ideas</h2>
        </div>
        <span className={styles.listMark} aria-hidden="true">✦</span>
      </div>

      {!ingredient ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">↖</span>
          <h3>What’s for dinner?</h3>
          <p>Select an ingredient from your groceries and I’ll look for meal ideas</p>
        </div>
      ) : (
        <>
          <p className={styles.searchSummary}>On the menu with <strong>{ingredient}</strong></p>
          <div role="status" aria-live="polite" className={styles.mealStatus}>
            {loading ? "Finding something delicious…" : error || (meals.length ? `${meals.length} meal ideas found` : "No meal ideas found for this ingredient")}
          </div>
          {error ? (
            <button type="button" className={styles.retryButton} onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
          ) : !loading && !meals.length ? (
            <p className={styles.emptyHint}>Try another food item — household supplies and some ingredients won’t have recipes</p>
          ) : null}
          {!loading && !error && (
            <ul className={styles.mealList}>
              {meals.map((meal) => (
                <li key={meal.idMeal} className={styles.mealCard}>
                  {meal.strMealThumb && (
                    <Image src={meal.strMealThumb} alt="" width={72} height={72} unoptimized className={styles.mealImage} />
                  )}
                  <h3>{meal.strMeal}</h3>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <p className={styles.attribution}>Meal ideas from <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a></p>
    </section>
  );
}

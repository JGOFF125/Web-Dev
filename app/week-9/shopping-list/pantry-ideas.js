"use client";

import { useState } from "react";
import { findPantryRecipes, pantryRecipes } from "./pantry-recipes";
import styles from "./shopping-list.module.css";

export default function PantryIdeas({ items }) {
  const [opened, setOpened] = useState(false);
  // I check the current groceries again whenever my list changes
  const recipes = opened ? findPantryRecipes(items) : [];

  return (
    <section className={`${styles.mealPanel} ${styles.pantryPanel}`} aria-labelledby="pantry-heading">
      <p className={styles.eyebrow}>Already in your kitchen</p>
      <h2 id="pantry-heading">What can I make?</h2>
      <p className={styles.pantryDescription}>
        Find a little inspiration using only the ingredients on your grocery list
      </p>
      <button type="button" className={styles.pantryButton} onClick={() => setOpened((current) => !current)} aria-expanded={opened} aria-controls="pantry-results">
        {opened ? "Hide my recipes" : "Find recipes with my groceries"}
        <span aria-hidden="true">{opened ? "−" : "→"}</span>
      </button>
      <p className={styles.pantryNote}>
        A collection of {pantryRecipes.length} everyday recipes · No extra butter, oil, or salt assumed · Water for cooking is assumed
      </p>
      <div id="pantry-results" hidden={!opened}>
        {opened && (
          <>
            <p role="status" aria-live="polite" className={styles.pantrySummary}>
              {recipes.length ? `${recipes.length} ${recipes.length === 1 ? "recipe matches" : "recipes match"} your groceries` : "No complete matches in this collection yet"}
            </p>
            <p className={styles.emptyHint}>
              {recipes.length
                ? "Matches update as you add groceries — check the recipe amounts before cooking"
                : "Every required ingredient needs to be on your list — try pancake mix, eggs, and milk, or tortillas and cheese"}
            </p>
            <div className={styles.pantryRecipes}>
              {recipes.map((recipe) => (
                <details key={recipe.id} className={styles.pantryRecipe}>
                  <summary>
                    <span>
                      <strong>{recipe.name}</strong>
                      <span className={styles.pantryRecipeHint}>{recipe.description}</span>
                      {recipe.isMexican && <span className={styles.mexicanBadge}>Mexican</span>}
                    </span>
                    <span className={styles.pantryExpand} aria-hidden="true">+</span>
                  </summary>
                  <div className={styles.pantryInstructions}>
                    <h3>From your groceries</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient) => <li key={ingredient.name}><strong>{ingredient.name}</strong><span>{ingredient.amount}</span></li>)}
                    </ul>
                    <h3>Let’s make it</h3>
                    <ol>{recipe.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                  </div>
                </details>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

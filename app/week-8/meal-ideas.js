"use client";

import { useState, useEffect } from "react";

// Fetches meals that use the given ingredient from TheMealDB
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    // The API returns null when nothing is found, so use an empty array instead
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  // Runs again every time the selected ingredient changes
  useEffect(() => {
    async function loadMealIdeas() {
      const result = await fetchMealIdeas(ingredient);
      setMeals(result);
    }

    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Meal Ideas</h2>

      {!ingredient && (
        <p className="text-slate-300">Select an item to see meal ideas.</p>
      )}

      {ingredient && meals.length === 0 && (
        <p className="text-slate-300">
          No meal ideas found for{" "}
          <span className="font-semibold text-white">{ingredient}</span>.
        </p>
      )}

      {ingredient && meals.length > 0 && (
        <>
          <p className="text-slate-300 mb-2">
            Here are some meal ideas using{" "}
            <span className="font-semibold text-white">{ingredient}</span>:
          </p>
          <ul>
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="p-3 my-2 bg-slate-800 text-white rounded-md"
              >
                {meal.strMeal}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
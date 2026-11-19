"use client";

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!ingredient) {
      return;
    }

    let ignore = false;

    async function loadMealIdeas() {
      try {
        const result = await fetchMealIdeas(ingredient);
        if (!ignore) {
          setMeals(result);
        }
      } catch (error) {
        console.error("Failed to load meal ideas:", error);
        if (!ignore) {
          setMeals([]);
        }
      }
    }

    loadMealIdeas();

    return () => {
      ignore = true;
    };
  }, [ingredient]);

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-emerald-900">Meal Ideas</h2>

      {!ingredient ? (
        <p className="text-emerald-700">Select an item to see meal ideas.</p>
      ) : (
        <>
          <p className="mb-3 text-emerald-700">
            Here are some meal ideas using{" "}
            <span className="font-semibold">{ingredient}</span>:
          </p>
          {meals.length === 0 ? (
            <p className="text-slate-500">No meal ideas found.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {meals.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-900"
                >
                  {meal.strMeal}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
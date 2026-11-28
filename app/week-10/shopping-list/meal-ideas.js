"use client"

import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient, signal) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`,
        { signal }
    );
    if (!response.ok) {
        throw new Error("Unable to load meal ideas.");
    }
    const data = await response.json();
    return data.meals ?? [];
}

export function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchMealIdeas(ingredient, controller.signal)
            .then(setMeals)
            .catch((fetchError) => {
                if (!controller.signal.aborted) {
                    setError(fetchError);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [ingredient]);

    return (
        <div>
            <h2 className="mt-4 mb-4 text-2xl font-bold">Meal ideas for {ingredient}</h2>
            {isLoading ? (
                <p>Loading meal ideas...</p>
            ) : error ? (
                <p role="alert">Could not load meal ideas. Please try again.</p>
            ) : meals.length === 0 ? (
                <p>No meal ideas found for the selected ingredient.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {meals.map((meal) => (
                        <li key={meal.idMeal}>
                            <h3>{meal.strMeal}</h3>
                            <img className="w-full rounded" src={meal.strMealThumb} alt={meal.strMeal} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
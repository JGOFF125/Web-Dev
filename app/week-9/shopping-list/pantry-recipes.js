const aliases = {
  eggs: "egg",
  bananas: "banana",
  tomatoes: "tomato",
  tortillas: "tortilla",
  "flour tortilla": "tortilla",
  "flour tortillas": "tortilla",
  "corn tortilla": "tortilla",
  "corn tortillas": "tortilla",
  spaghetti: "pasta",
  penne: "pasta",
  "cheddar cheese": "cheese",
  cheddar: "cheese",
  mozzarella: "cheese",
  "mozzarella cheese": "cheese",
  "shredded cheese": "cheese",
  "plain yogurt": "yogurt",
  "pancakes mix": "pancake mix",
  "pancake formula": "pancake mix",
  "pancakes formula": "pancake mix",
  "canned black beans": "cooked black beans",
};

export function normalizePantryName(name) {
  const cleaned = name.split(",")[0]
    .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u200d\ufe0f]/gu, "")
    .toLowerCase().trim().replace(/\s+/g, " ");
  return aliases[cleaned] || cleaned;
}

export const pantryRecipes = [
  {
    id: "mix-pancakes",
    name: "Pancake-mix pancakes",
    description: "A simple breakfast with the mix you already have",
    ingredients: [
      { name: "pancake mix", amount: "Use the amount on your package" },
      { name: "egg", amount: "Use the number on your package" },
      { name: "milk", amount: "Use the amount on your package" },
    ],
    steps: [
      "Check that your pancake mix calls for eggs and milk, then follow its package measurements",
      "Mix the ingredients as directed and let the batter rest if the package recommends it",
      "Cook small portions in a nonstick pan over medium heat, flipping when bubbles form and the edges set, until cooked through",
    ],
  },
  {
    id: "banana-pancakes",
    name: "Banana & egg pancakes",
    description: "Two ingredients, small pancakes, easy morning",
    ingredients: [{ name: "banana", amount: "1 ripe banana" }, { name: "egg", amount: "2 eggs" }],
    steps: [
      "Mash the banana until smooth and whisk in the eggs",
      "Warm a nonstick pan over medium-low heat and add small spoonfuls of batter",
      "Cook until the bottoms set, flip carefully, and cook until firm all the way through",
    ],
  },
  {
    id: "scrambled-eggs",
    name: "Soft scrambled eggs",
    description: "A quick, warm breakfast",
    ingredients: [{ name: "egg", amount: "2 eggs" }, { name: "butter", amount: "1 teaspoon" }],
    steps: ["Beat the eggs in a bowl", "Melt the butter in a pan over low heat", "Add the eggs and gently stir until set with no liquid egg remaining"],
  },
  {
    id: "cheese-omelette",
    name: "Cheese omelette",
    description: "A little more filling, still simple",
    ingredients: [{ name: "egg", amount: "2 eggs" }, { name: "cheese", amount: "¼ cup, grated" }, { name: "butter", amount: "1 teaspoon" }],
    steps: ["Beat the eggs and melt the butter in a pan over medium-low heat", "Pour in the eggs and gently lift the edges so the uncooked egg reaches the pan", "Once the egg is set, add the cheese, fold the omelette, and cook until the cheese melts"],
  },
  {
    id: "egg-toast",
    name: "Egg-in-a-hole toast",
    description: "Your eggs and toast, in one pan",
    ingredients: [{ name: "bread", amount: "1 slice" }, { name: "egg", amount: "1 egg" }, { name: "butter", amount: "1 teaspoon" }],
    steps: ["Cut a small hole in the middle of the bread", "Melt the butter in a pan, add the bread, and crack the egg into the hole", "Cook over medium-low heat, flip carefully, and continue until the egg is fully set"],
  },
  {
    id: "banana-smoothie",
    name: "Banana milk smoothie",
    description: "Cool, creamy, and ready in a minute",
    ingredients: [{ name: "banana", amount: "1 ripe banana" }, { name: "milk", amount: "¾ cup" }],
    steps: ["Peel and slice the banana", "Blend the banana and milk until smooth", "Serve immediately"],
  },
  {
    id: "banana-yogurt",
    name: "Banana yogurt bowl",
    description: "No cooking needed",
    ingredients: [{ name: "banana", amount: "1 banana" }, { name: "yogurt", amount: "¾ cup" }],
    steps: ["Spoon the yogurt into a bowl", "Slice the banana over the yogurt and serve"],
  },
  {
    id: "banana-toast",
    name: "Peanut butter banana toast",
    description: "A quick snack from three staples",
    ingredients: [{ name: "bread", amount: "1 slice" }, { name: "peanut butter", amount: "1 tablespoon" }, { name: "banana", amount: "½ banana" }],
    steps: ["Toast the bread", "Spread with peanut butter and top with sliced banana"],
  },
  {
    id: "tomato-sandwich",
    name: "Tomato & cheese sandwich",
    description: "A fresh, simple lunch",
    ingredients: [{ name: "bread", amount: "2 slices" }, { name: "tomato", amount: "1 small tomato" }, { name: "cheese", amount: "2 slices" }],
    steps: ["Slice the tomato", "Layer the tomato and cheese between the bread slices and serve"],
  },
  {
    id: "garlic-pasta",
    name: "Garlic & olive oil pasta",
    description: "A simple pantry dinner",
    ingredients: [{ name: "pasta", amount: "100 g dry pasta" }, { name: "garlic", amount: "1 clove, thinly sliced" }, { name: "olive oil", amount: "1 tablespoon" }],
    steps: ["Boil the pasta in water according to its package and reserve a little cooking water before draining", "Gently warm the garlic in the olive oil until fragrant without letting it burn", "Toss in the pasta and a splash of its cooking water until coated"],
  },
  {
    id: "broccoli-pasta",
    name: "Broccoli pasta",
    description: "An easy vegetable dinner",
    ingredients: [{ name: "pasta", amount: "100 g dry pasta" }, { name: "broccoli", amount: "1 cup, cut into small florets" }, { name: "olive oil", amount: "1 tablespoon" }],
    steps: ["Boil the pasta in water according to its package", "Add the broccoli to the same pot for the final 3–4 minutes, cooking until tender", "Drain and toss with the olive oil"],
  },
  {
    id: "cheese-quesadilla",
    name: "Cheese quesadilla",
    description: "Crisp tortilla, melted cheese",
    isMexican: true,
    ingredients: [{ name: "tortilla", amount: "1 large or 2 small tortillas" }, { name: "cheese", amount: "⅓ cup, grated" }],
    steps: ["Cover half of each tortilla with cheese and fold it over", "Heat in a dry nonstick pan over medium-low heat", "Flip once and cook until the tortilla is crisp and the cheese melts"],
  },
  {
    id: "bean-quesadilla",
    name: "Black bean quesadilla",
    description: "A filling version with beans",
    isMexican: true,
    ingredients: [{ name: "tortilla", amount: "1 large or 2 small tortillas" }, { name: "cheese", amount: "⅓ cup, grated" }, { name: "cooked black beans", amount: "⅓ cup, drained" }],
    steps: ["Lightly mash the cooked beans and spread over half of each tortilla", "Add the cheese and fold the tortilla", "Cook both sides in a dry nonstick pan over medium-low heat until crisp and hot throughout"],
  },
];

export function findPantryRecipes(items) {
  const available = new Set(items
    .filter((item) => item.category !== "household" && Number(item.quantity) > 0)
    .map((item) => normalizePantryName(item.name)));

  // I only show recipes when every ingredient is on my list
  return pantryRecipes.filter((recipe) => recipe.ingredients.every(({ name }) => available.has(name)))
    .sort((a, b) => Number(Boolean(b.isMexican)) - Number(Boolean(a.isMexican)) || a.name.localeCompare(b.name));
}

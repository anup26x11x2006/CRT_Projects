import { useEffect, useMemo, useState } from 'react'
import { RecipeContext } from './useRecipes'

const STORAGE_KEY = 'little-recipe-book-v1'

const starterRecipes = [
  {
    id: 'lemon-pasta', title: 'Creamy lemon pasta',
    description: 'Bright, buttery and ready in the time it takes to boil pasta.',
    category: 'Dinner', time: 25, servings: 2,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['200 g spaghetti', '1 lemon, zested and juiced', '2 tbsp butter', '1/3 cup finely grated parmesan', '1/2 cup pasta water', 'Freshly cracked black pepper'],
    instructions: ['Bring a large pot of salted water to a boil and cook the pasta until just al dente.', 'Melt the butter in a wide pan. Add lemon zest and a generous amount of black pepper.', 'Transfer the pasta to the pan with a splash of pasta water. Toss in the parmesan and lemon juice until glossy.', 'Loosen with more pasta water if needed. Finish with extra parmesan and serve right away.'],
  },
  {
    id: 'tomato-toast', title: 'Whipped ricotta tomato toast',
    description: 'The easiest little lunch: juicy tomatoes, fluffy ricotta, crunchy toast.',
    category: 'Lunch', time: 15, servings: 2,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['2 thick slices sourdough', '1/2 cup ricotta', '1 cup cherry tomatoes', '1 tbsp olive oil', '1 tsp honey', 'Basil leaves', 'Flaky salt'],
    instructions: ['Toast the sourdough until deeply golden.', 'Whip the ricotta with a pinch of salt until light and creamy.', 'Halve the tomatoes and toss with olive oil and flaky salt.', 'Spread ricotta over the toast, pile on the tomatoes, then finish with honey and basil.'],
  },
  {
    id: 'berry-pancakes', title: 'Sunday berry pancakes',
    description: 'Soft, golden pancakes with berries tucked into every bite.',
    category: 'Breakfast', time: 20, servings: 4,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['1 1/2 cups all-purpose flour', '2 tbsp sugar', '2 tsp baking powder', '1 1/4 cups milk', '1 egg', '2 tbsp melted butter', '1 cup mixed berries'],
    instructions: ['Whisk flour, sugar and baking powder in a large bowl.', 'In another bowl, whisk milk, egg and melted butter. Stir into the dry ingredients until just combined.', 'Fold in half the berries. Cook small scoops on a buttered skillet until bubbles form, then flip.', 'Serve warm with the remaining berries and maple syrup.'],
  },
  {
    id: 'green-goddess-bowl', title: 'Green goddess grain bowl',
    description: 'A fresh, feel-good bowl full of crunchy greens and herby dressing.',
    category: 'Lunch', time: 30, servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['1 cup cooked quinoa', '1 ripe avocado', '1 cucumber', '2 cups leafy greens', '1/2 cup plain yogurt', '1 small bunch mixed soft herbs', '1 lime'],
    instructions: ['Blend yogurt, herbs, lime juice, a pinch of salt and a splash of water into a pourable dressing.', 'Slice the cucumber and avocado.', 'Divide quinoa and greens between bowls, then add the cucumber and avocado.', 'Spoon over plenty of green dressing and serve.'],
  },
  {
    id: 'roasted-carrots', title: 'Honey roasted carrots',
    description: 'Sweet, caramelized carrots with a little tangy yogurt on the side.',
    category: 'Sides', time: 35, servings: 4,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['600 g carrots', '1 tbsp olive oil', '1 tbsp honey', '1/2 tsp cumin', '1/2 cup thick yogurt', '1 tbsp lemon juice', 'Fresh dill'],
    instructions: ['Heat the oven to 220°C / 425°F. Scrub and halve the carrots lengthwise.', 'Toss with olive oil, honey, cumin and salt. Roast for 25–30 minutes until tender and browned.', 'Stir lemon juice into the yogurt and spread it on a serving plate.', 'Pile the warm carrots on top and finish with dill.'],
  },
  {
    id: 'chocolate-mousse', title: 'No-fuss chocolate mousse',
    description: 'Silky, rich chocolate dessert with only a handful of ingredients.',
    category: 'Dessert', time: 20, servings: 4,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['170 g dark chocolate', '3 eggs, separated', '2 tbsp sugar', '1/2 cup heavy cream', 'A pinch of flaky salt'],
    instructions: ['Melt the chocolate gently and let it cool for a few minutes.', 'Whisk egg yolks into the chocolate one at a time.', 'Beat egg whites to soft peaks, gradually adding the sugar. In a separate bowl, whip the cream to soft peaks.', 'Fold the cream into the chocolate, then gently fold in the egg whites. Spoon into glasses and chill for at least 2 hours.'],
  },
]

function readStoredData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return { recipes: starterRecipes, favorites: [] }

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.recipes) || !Array.isArray(parsed.favorites)) {
      throw new Error('Stored recipe data has an invalid format.')
    }
    return parsed
  } catch (error) {
    console.error('Could not load saved recipes. Starting with the sample collection.', error)
    return { recipes: starterRecipes, favorites: [] }
  }
}

export function RecipeProvider({ children }) {
  const [initialData] = useState(readStoredData)
  const [recipes, setRecipes] = useState(initialData.recipes)
  const [favorites, setFavorites] = useState(initialData.favorites)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ recipes, favorites }))
    } catch (error) {
      console.error('Could not save recipe changes to this browser.', error)
    }
  }, [recipes, favorites])

  function saveRecipe(recipe) {
    if (recipe.id) {
      setRecipes((current) => current.map((item) => item.id === recipe.id ? { ...recipe, isCustom: true } : item))
      return recipe.id
    }
    const id = `recipe-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setRecipes((current) => [{ ...recipe, id, isCustom: true }, ...current])
    return id
  }

  function deleteRecipe(id) {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id))
    setFavorites((current) => current.filter((favoriteId) => favoriteId !== id))
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id])
  }

  const value = useMemo(() => ({ recipes, favorites, saveRecipe, deleteRecipe, toggleFavorite }), [recipes, favorites])
  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

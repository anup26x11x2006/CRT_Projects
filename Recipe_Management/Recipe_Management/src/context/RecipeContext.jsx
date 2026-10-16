import { useEffect, useMemo, useState } from 'react'
import { RecipeContext } from './useRecipes'

const STORAGE_KEY = 'little-recipe-book-v1'

const starterRecipes = [
  {
    id: 'masala-dosa', title: 'Golden masala dosa',
    description: 'Crisp, golden rice crepes wrapped around gently spiced potato masala.',
    category: 'Breakfast', time: 40, servings: 4,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['8 prepared dosa batter portions', '4 medium potatoes, boiled', '1 onion, thinly sliced', '1 tsp mustard seeds', '8 curry leaves', '1/2 tsp turmeric', '2 tbsp oil', 'Coconut chutney and sambar, to serve'],
    instructions: ['Roughly mash the boiled potatoes. Heat oil in a pan and let the mustard seeds pop.', 'Add curry leaves and onion; cook until soft. Stir in turmeric, potatoes and salt.', 'Spread a ladle of dosa batter thinly over a hot, lightly oiled pan.', 'Cook until crisp and golden, spoon the potato masala into the centre, fold and serve with chutney and sambar.'],
  },
  {
    id: 'poha', title: 'Indori-style poha',
    description: 'A light, lemony breakfast with fluffy flattened rice, peanuts and fresh herbs.',
    category: 'Breakfast', time: 25, servings: 4,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['2 cups thick poha (flattened rice)', '1 small onion, finely chopped', '2 tbsp roasted peanuts', '1 tsp mustard seeds', '8 curry leaves', '1/2 tsp turmeric', '1 lemon, cut into wedges', 'Fresh coriander and sev, to finish'],
    instructions: ['Rinse the poha briefly in a sieve, drain well and leave to soften for 5 minutes.', 'Heat a little oil in a pan. Add mustard seeds, curry leaves and peanuts.', 'Stir in the onion and turmeric and cook until the onion turns soft.', 'Fold in the poha and salt. Warm gently, then finish with lemon, coriander and sev.'],
  },
  {
    id: 'idli-sambar', title: 'Soft idli & homestyle sambar',
    description: 'Steamed, pillowy idlis with a comforting lentil and vegetable sambar.',
    category: 'Breakfast', time: 35, servings: 4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['12 prepared idli batter portions', '1/2 cup toor dal', '1 tomato, chopped', '1 small carrot, chopped', '1/2 cup chopped pumpkin', '1 tbsp sambar powder', '1 tsp mustard seeds', 'Curry leaves and coriander'],
    instructions: ['Pressure-cook the toor dal until soft, then whisk until smooth.', 'Simmer the vegetables with sambar powder, turmeric and water until tender.', 'Stir in the cooked dal and simmer for 8 minutes. Season to taste.', 'Steam the idli batter in greased moulds until fluffy. Serve hot with sambar and chutney.'],
  },
  {
    id: 'chole-bhature', title: 'Punjabi chole bhature',
    description: 'Tangy, slow-simmered chickpeas served with warm, puffed bhature.',
    category: 'Lunch', time: 55, servings: 4,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['2 cups cooked chickpeas', '2 onions, finely chopped', '2 tomatoes, puréed', '1 tbsp ginger-garlic paste', '2 tsp chole masala', '1 tsp cumin seeds', '1/2 tsp turmeric', '4 bhature, to serve', 'Fresh coriander and lemon'],
    instructions: ['Heat oil in a deep pan. Add cumin, then cook the onions until golden.', 'Stir in ginger-garlic paste and tomato purée; cook until thick and glossy.', 'Add chole masala, turmeric, chickpeas and a cup of water. Simmer for 25 minutes.', 'Lightly mash a few chickpeas to thicken the gravy. Garnish with coriander and serve with hot bhature.'],
  },
  {
    id: 'dal-tadka', title: 'Dal tadka & jeera rice',
    description: 'Everyday yellow lentils finished with a fragrant cumin, garlic and chilli tadka.',
    category: 'Lunch', time: 40, servings: 4,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['1 cup toor dal', '1/2 tsp turmeric', '1 tomato, chopped', '1 tsp cumin seeds', '3 garlic cloves, sliced', '1 dried red chilli', '1 tbsp ghee', 'Fresh coriander', 'Steamed jeera rice, to serve'],
    instructions: ['Rinse the dal and pressure-cook with turmeric and 3 cups of water until soft.', 'Whisk the dal, stir in the tomato and simmer for 8 minutes. Add salt to taste.', 'Heat ghee in a small pan. Add cumin, garlic and dried chilli; cook until fragrant.', 'Pour the hot tadka over the dal, garnish with coriander and serve with jeera rice.'],
  },
  {
    id: 'paneer-butter-masala', title: 'Paneer butter masala',
    description: 'Tender paneer in a velvety tomato gravy scented with warming spices.',
    category: 'Dinner', time: 40, servings: 4,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['400 g paneer, cubed', '3 ripe tomatoes, chopped', '1 onion, chopped', '12 cashews', '1 tsp ginger-garlic paste', '1 tsp garam masala', '1/2 tsp Kashmiri chilli powder', '2 tbsp butter', '2 tbsp cream', 'Kasuri methi'],
    instructions: ['Simmer tomatoes, onion and cashews with a splash of water until soft. Cool and blend until smooth.', 'Melt butter in a pan. Add ginger-garlic paste, chilli powder and garam masala.', 'Pour in the tomato purée and simmer gently for 10 minutes, stirring occasionally.', 'Fold in paneer and cream. Finish with crushed kasuri methi and serve with roti or rice.'],
  },
  {
    id: 'vegetable-biryani', title: 'Dum vegetable biryani',
    description: 'Fragrant basmati rice layered with vegetables, mint and saffron.',
    category: 'Dinner', time: 65, servings: 5,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['2 cups aged basmati rice', '2 cups mixed vegetables', '1 onion, thinly sliced', '1/2 cup plain yogurt', '1 tbsp biryani masala', '1/4 tsp turmeric', '1/4 tsp saffron soaked in warm milk', 'Fresh mint and coriander', '2 tbsp ghee'],
    instructions: ['Rinse and soak the rice for 20 minutes. Parboil in salted water until just 70% cooked, then drain.', 'Sauté the onion in ghee until golden. Add vegetables, yogurt, biryani masala and turmeric; cook until just tender.', 'Layer the vegetables and rice in a heavy pot. Scatter over saffron milk, mint and coriander.', 'Cover tightly and cook on the lowest heat for 20 minutes. Rest for 10 minutes before fluffing and serving.'],
  },
  {
    id: 'samosa', title: 'Crisp Punjabi samosas',
    description: 'Flaky pastry parcels packed with spiced potato, peas and a little heat.',
    category: 'Snacks', time: 60, servings: 8,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['2 cups plain flour', '4 potatoes, boiled and mashed', '1/2 cup green peas', '1 tsp cumin seeds', '1 tsp amchur powder', '1/2 tsp garam masala', '2 tbsp oil, plus more for frying', 'Fresh coriander'],
    instructions: ['Rub 2 tablespoons of oil into the flour with a pinch of salt. Add water gradually and knead into a firm dough; rest for 30 minutes.', 'Toast cumin in a pan. Add peas, potato, amchur, garam masala and coriander; season and cool.', 'Divide the dough, roll into ovals and cut in half. Shape each piece into a cone and fill with potato mixture.', 'Seal the edges with water and fry over medium-low heat until crisp and deep golden. Serve with chutney.'],
  },
  {
    id: 'gulab-jamun', title: 'Warm gulab jamun',
    description: 'Soft, golden milk dumplings soaked in cardamom and rose-scented syrup.',
    category: 'Dessert', time: 50, servings: 6,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85',
    ingredients: ['1 cup milk powder', '1/4 cup plain flour', '2 tbsp ghee', '1/4 cup milk, as needed', '1 cup sugar', '1 cup water', '4 cardamom pods, crushed', '1 tsp rose water', 'Oil or ghee, for frying'],
    instructions: ['Simmer sugar, water and cardamom for 8 minutes. Stir in rose water and keep the syrup warm.', 'Mix milk powder, flour and ghee. Add milk a little at a time to make a soft, smooth dough.', 'Roll into small crack-free balls. Fry slowly over low heat, turning often, until evenly golden.', 'Transfer the warm dumplings to the warm syrup and soak for at least 30 minutes before serving.'],
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
    const customRecipes = parsed.recipes.filter((recipe) => recipe.isCustom)
    const availableRecipeIds = new Set([
      ...starterRecipes.map((recipe) => recipe.id),
      ...customRecipes.map((recipe) => recipe.id),
    ])
    return {
      recipes: [...customRecipes, ...starterRecipes],
      favorites: parsed.favorites.filter((id) => availableRecipeIds.has(id)),
    }
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
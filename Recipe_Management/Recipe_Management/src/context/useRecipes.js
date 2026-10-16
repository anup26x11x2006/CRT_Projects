import { createContext, useContext } from 'react'

export const RecipeContext = createContext(null)

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (!context) throw new Error('useRecipes must be used within a RecipeProvider.')
  return context
}
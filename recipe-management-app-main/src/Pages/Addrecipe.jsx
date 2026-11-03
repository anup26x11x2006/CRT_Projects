import RecipeForm from '../components/recipeForm'
import { useRecipes } from '../context/useRecipes'

export default function AddRecipe({ recipe, onNavigate }) {
  const { saveRecipe } = useRecipes()

  if (recipe && !recipe.isCustom) {
    return (
      <section className="page simple-page">
        <div className="empty-state">
          <span className="empty-illustration" aria-hidden="true">🍋</span>
          <h3>This recipe is part of the collection</h3>
          <p>You can edit recipes you’ve added yourself.</p>
          <button className="button button-primary" onClick={() => onNavigate(`/recipe/${recipe.id}`)} type="button">Back to recipe</button>
        </div>
      </section>
    )
  }

  function handleSave(values) {
    const id = saveRecipe(values)
    onNavigate(`/recipe/${id}`)
  }

  return (
    <section className="page form-page">
      <button className="back-link" onClick={() => onNavigate(recipe ? `/recipe/${recipe.id}` : '/')} type="button"><span aria-hidden="true">←</span> {recipe ? 'Back to recipe' : 'Back to the collection'}</button>
      <div className="form-page-intro">
        <p className="eyebrow">{recipe ? 'MAKE IT YOURS' : 'PASS IT AROUND'}</p>
        <h1>{recipe ? 'A little update' : 'Add a recipe'}<span className="heading-period">.</span></h1>
        <p>{recipe ? 'Give your recipe a quick edit.' : 'Write down the good stuff, so you can find it again.'}</p>
      </div>
      <div className="form-card">
        <RecipeForm recipe={recipe} onCancel={() => onNavigate(recipe ? `/recipe/${recipe.id}` : '/')} onSave={handleSave} />
      </div>
    </section>
  )
}
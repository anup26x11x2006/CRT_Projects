import { useState } from 'react'
import { useRecipes } from '../context/useRecipes'

export default function RecipeDetails({ recipe, onNavigate }) {
  const { favorites, toggleFavorite, deleteRecipe } = useRecipes()
  const [checkedIngredients, setCheckedIngredients] = useState([])

  if (!recipe) {
    return (
      <section className="page simple-page">
        <div className="empty-state">
          <span className="empty-illustration" aria-hidden="true">🍽️</span>
          <h3>We couldn’t find that recipe</h3>
          <p>It may have been removed from your collection.</p>
          <button className="button button-primary" onClick={() => onNavigate('/')} type="button">Back to recipes</button>
        </div>
      </section>
    )
  }

  const isFavorite = favorites.includes(recipe.id)
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : []

  function toggleIngredient(index) {
    setCheckedIngredients((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index])
  }

  function handleDelete() {
    if (window.confirm(`Delete “${recipe.title}” from your recipes? This cannot be undone.`)) {
      deleteRecipe(recipe.id)
      onNavigate('/')
    }
  }

  return (
    <article className="page detail-page">
      <button className="back-link" onClick={() => onNavigate('/')} type="button"><span aria-hidden="true">←</span> All recipes</button>
      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div className="detail-hero-shade" />
        <span className="detail-category">{recipe.category}</span>
        <div className="detail-hero-content">
          <p className="eyebrow">FROM OUR LITTLE KITCHEN</p>
          <h1>{recipe.title}<span className="heading-period">.</span></h1>
          <p>{recipe.description}</p>
        </div>
      </div>
      <div className="detail-actions">
        <div className="detail-facts">
          <span><b aria-hidden="true">◷</b> {recipe.time} minutes</span>
          <span><b aria-hidden="true">♧</b> {recipe.servings} servings</span>
          <span><b aria-hidden="true">✳</b> {ingredients.length} ingredients</span>
        </div>
        <div className="detail-buttons">
          <button className={`button button-secondary${isFavorite ? ' favorited' : ''}`} onClick={() => toggleFavorite(recipe.id)} type="button">
            <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span> {isFavorite ? 'Saved' : 'Save recipe'}
          </button>
          <button className="button button-secondary" onClick={() => window.print()} type="button"><span aria-hidden="true">↗</span> Print</button>
          {recipe.isCustom && <button className="button button-secondary" onClick={() => onNavigate(`/recipe/${recipe.id}/edit`)} type="button">Edit</button>}
          {recipe.isCustom && <button className="button button-delete" onClick={handleDelete} type="button">Delete</button>}
        </div>
      </div>
      <div className="detail-content">
        <section className="ingredients-panel">
          <p className="eyebrow">GET EVERYTHING READY</p>
          <h2>The ingredients<span className="heading-period">.</span></h2>
          <p className="ingredients-hint">Tap an ingredient as you go.</p>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>
                <label className={checkedIngredients.includes(index) ? 'ingredient-checked' : ''}>
                  <input checked={checkedIngredients.includes(index)} onChange={() => toggleIngredient(index)} type="checkbox" />
                  <span className="custom-checkbox" aria-hidden="true">{checkedIngredients.includes(index) ? '✓' : ''}</span>
                  <span>{ingredient}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
        <section className="method-panel">
          <p className="eyebrow">LET’S MAKE IT</p>
          <h2>Here’s how<span className="heading-period">.</span></h2>
          {instructions.length ? (
            <ol className="instruction-list">
              {instructions.map((instruction, index) => (
                <li key={`${instruction}-${index}`}>
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          ) : <p className="instructions-empty">No method added yet. Edit this recipe to add your steps.</p>}
        </section>
      </div>
      <div className="detail-signoff"><span aria-hidden="true">✳</span> That’s it. Enjoy every bite!</div>
    </article>
  )
}
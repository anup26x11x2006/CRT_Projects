import RecipeCard from '../components/recipecard'
import { useRecipes } from '../context/useRecipes'

export default function Favorites({ onNavigate }) {
  const { recipes, favorites } = useRecipes()
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))

  return (
    <section className="page simple-page">
      <div className="simple-page-heading">
        <p className="eyebrow"><span aria-hidden="true">♥</span> SAVED WITH LOVE</p>
        <h1>Your favorites<span className="heading-period">.</span></h1>
        <p>The recipes you never want to lose, all in one lovely little place.</p>
      </div>
      {favoriteRecipes.length ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => <RecipeCard key={recipe.id} onNavigate={onNavigate} recipe={recipe} />)}
        </div>
      ) : (
        <div className="empty-state favorite-empty">
          <span className="empty-illustration" aria-hidden="true">♡</span>
          <h3>A little room for recipes you love</h3>
          <p>Tap the heart on any recipe and it will be waiting here for you.</p>
          <button className="button button-primary" onClick={() => onNavigate('/')} type="button">Explore recipes <span aria-hidden="true">→</span></button>
        </div>
      )}
    </section>
  )
}
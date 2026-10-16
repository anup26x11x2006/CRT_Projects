import { useRecipes } from '../context/useRecipes'

export default function RecipeCard({ recipe, onNavigate }) {
  const { favorites, toggleFavorite } = useRecipes()
  const isFavorite = favorites.includes(recipe.id)

  return (
    <article className="recipe-card">
      <div className="card-image-wrap">
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <span className="category-pill">{recipe.category}</span>
        <button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          type="button"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-content">
        <div className="recipe-meta">
          <span><span aria-hidden="true">◷</span> {recipe.time} min</span>
          <span className="meta-dot">·</span>
          <span>{recipe.servings} servings</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="card-bottom">
          <span className="card-category">{recipe.category}</span>
          <a className="text-link" href={`/recipe/${recipe.id}`} onClick={(event) => { event.preventDefault(); onNavigate(`/recipe/${recipe.id}`) }}>
            Get cooking <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}
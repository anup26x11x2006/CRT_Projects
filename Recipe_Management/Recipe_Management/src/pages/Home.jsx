import { useMemo, useState } from 'react'
import RecipeCard from '../components/recipecard'
import { useRecipes } from '../context/useRecipes'

const filters = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Sides']

export default function Home({ onNavigate }) {
  const { recipes } = useRecipes()
  const [activeCategory, setActiveCategory] = useState('All recipes')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  const visibleRecipes = useMemo(() => {
    const query = search.trim().toLowerCase()
    return recipes
      .filter((recipe) => activeCategory === 'All recipes' || recipe.category === activeCategory)
      .filter((recipe) => !query || `${recipe.title} ${recipe.description} ${recipe.category} ${recipe.ingredients.join(' ')}`.toLowerCase().includes(query))
      .sort((a, b) => sort === 'quickest' ? a.time - b.time : 0)
  }, [recipes, activeCategory, search, sort])

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✳</span> RECIPES ROOTED IN INDIA</p>
          <h1>A taste of<br /><em>tradition.</em></h1>
          <p className="hero-description">From crisp dosas at dawn to slow-simmered Sunday dals, discover the much-loved flavours and family favourites of India.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#recipes">Explore the collection <span aria-hidden="true">↓</span></a>
            <a className="hero-secondary-link" href="/add" onClick={(event) => { event.preventDefault(); onNavigate('/add') }}>＋ Share a recipe</a>
          </div>
          <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>🌶️</i><i>🌿</i><i>🫚</i></span><span>Regional favourites, made for your table.</span></div>
        </div>
        <div className="hero-photo" role="img" aria-label="A colourful spread of traditional Indian dishes">
          <div className="hero-photo-caption"><span>FROM EVERY CORNER OF INDIA</span><strong>Generous flavours.<br />Stories in every bite.</strong></div>
          <span className="hero-sparkle" aria-hidden="true">✳</span>
        </div>
        <div className="hero-sticker" aria-hidden="true"><span>MADE<br />WITH</span><strong>♥</strong><span>GOOD<br />TASTE</span></div>
      </section>

      <section className="recipe-section" id="recipes">
        <div className="section-heading">
          <div>
              <p className="eyebrow">A TABLE FULL OF FAVOURITES</p>
              <h2>What are you craving?</h2>
          </div>
            <p className="section-aside">Comforting classics and regional gems,<br />ready to bring a little India to your kitchen.</p>
        </div>
        <div className="recipe-toolbar">
          <div className="category-tabs" aria-label="Filter recipes by category">
            {filters.map((category) => (
              <button className={category === activeCategory ? 'category-tab active' : 'category-tab'} key={category} onClick={() => setActiveCategory(category)} type="button">
                {category}
              </button>
            ))}
          </div>
          <div className="recipe-controls">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Search recipes" onChange={(event) => setSearch(event.target.value)} placeholder="Find a dish..." type="search" value={search} />
            </label>
            <label className="sort-select">
              <span className="visually-hidden">Sort recipes</span>
              <select onChange={(event) => setSort(event.target.value)} value={sort}>
                <option value="featured">Featured</option>
                <option value="quickest">Quickest first</option>
              </select>
            </label>
          </div>
        </div>
        {visibleRecipes.length ? (
          <div className="recipe-grid">
            {visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} onNavigate={onNavigate} recipe={recipe} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-illustration" aria-hidden="true">🥣</span>
            <h3>No dishes found</h3>
            <p>Try another search, or add a much-loved recipe of your own.</p>
            <button className="button button-primary" onClick={() => onNavigate('/add')} type="button">Add a recipe</button>
          </div>
        )}
        <div className="collection-note"><span aria-hidden="true">✳</span> {recipes.length} recipes from kitchens across India</div>
      </section>
      <section className="bottom-cta">
        <span className="cta-flower" aria-hidden="true">✳</span>
        <div><p className="eyebrow">PASS A FAVOURITE AROUND</p><h2>A recipe with a story?</h2><p>Add a family classic and keep its flavours close at hand.</p></div>
        <button className="button button-dark" onClick={() => onNavigate('/add')} type="button">Share your recipe <span aria-hidden="true">→</span></button>
      </section>
    </div>
  )
}
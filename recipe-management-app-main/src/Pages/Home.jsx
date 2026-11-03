import { useMemo, useState } from 'react'
import RecipeCard from '../components/recipecard'
import { useRecipes } from '../context/useRecipes'

const filters = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Sides']

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
          <p className="eyebrow"><span aria-hidden="true">✳</span> YOUR KITCHEN, YOUR COLLECTION</p>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p className="hero-description">A cozy corner for the recipes you love, the ones you want to try, and everything delicious in between.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#recipes">Find your next favorite <span aria-hidden="true">↓</span></a>
            <a className="hero-secondary-link" href="/add" onClick={(event) => { event.preventDefault(); onNavigate('/add') }}>＋ Add your own</a>
          </div>
          <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>🍋</i><i>🍓</i><i>🥑</i></span><span>Made with love, shared with everyone.</span></div>
        </div>
        <div className="hero-photo" role="img" aria-label="A colorful table spread with fresh food">
          <div className="hero-photo-caption"><span>THE GOOD STUFF</span><strong>Simple ingredients,<br />a little bit of magic.</strong></div>
          <span className="hero-sparkle" aria-hidden="true">✳</span>
        </div>
        <div className="hero-sticker" aria-hidden="true"><span>MADE<br />WITH</span><strong>♥</strong><span>GOOD<br />TASTE</span></div>
      </section>

      <section className="recipe-section" id="recipes">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A LITTLE INSPIRATION</p>
            <h2>What sounds good?</h2>
          </div>
          <p className="section-aside">A collection of tried-and-loved<br />recipes for your everyday.</p>
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
              <input aria-label="Search recipes" onChange={(event) => setSearch(event.target.value)} placeholder="Find a recipe..." type="search" value={search} />
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
            <h3>No recipes found just yet</h3>
            <p>Try another search or add a recipe to your collection.</p>
            <button className="button button-primary" onClick={() => onNavigate('/add')} type="button">Add a recipe</button>
          </div>
        )}
        <div className="collection-note"><span aria-hidden="true">✳</span> {recipes.length} recipes in your little collection</div>
      </section>
      <section className="bottom-cta">
        <span className="cta-flower" aria-hidden="true">✳</span>
        <div><p className="eyebrow">YOUR SECRET INGREDIENT</p><h2>Something you love to make?</h2><p>Save it here, so it’s always close at hand.</p></div>
        <button className="button button-dark" onClick={() => onNavigate('/add')} type="button">Add your recipe <span aria-hidden="true">→</span></button>
      </section>
    </div>
  )
}
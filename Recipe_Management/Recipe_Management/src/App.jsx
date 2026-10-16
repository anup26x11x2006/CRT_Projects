import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import AddRecipe from './Pages/Addrecipe'
import Favorites from './Pages/Favorites'
import Home from './Pages/Home'
import RecipeDetails from './Pages/RecipeDetailes'
import { RecipeProvider } from './context/RecipeContext'
import { useRecipes } from './context/useRecipes'
import './App.css'

function AppContent() {
  const [path, setPath] = useState(window.location.pathname)
  const { recipes } = useRecipes()

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(destination) {
    if (destination !== window.location.pathname) {
      window.history.pushState({}, '', destination)
      setPath(destination)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const detailMatch = path.match(/^\/recipe\/([^/]+)(\/edit)?\/?$/)
  let page

  if (path === '/favorites') {
    page = <Favorites onNavigate={navigate} />
  } else if (path === '/add') {
    page = <AddRecipe onNavigate={navigate} />
  } else if (detailMatch) {
    const recipe = recipes.find((item) => item.id === detailMatch[1])
    page = detailMatch[2] ? (
      <AddRecipe recipe={recipe} onNavigate={navigate} />
    ) : (
      <RecipeDetails recipe={recipe} onNavigate={navigate} />
    )
  } else {
    page = <Home onNavigate={navigate} />
  }

  return (
    <div className="app-shell">
      <Navbar onNavigate={navigate} />
      <main>{page}</main>
      <footer className="site-footer">
        <a className="footer-brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }}>
          <span aria-hidden="true">✳</span> ghar ka swad
        </a>
        <p>India’s cherished flavours, shared from kitchen to kitchen.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <RecipeProvider>
      <AppContent />
    </RecipeProvider>
  )
}
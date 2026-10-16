export default function Navbar({ onNavigate }) {
  function go(event, destination) {
    event.preventDefault()
    onNavigate(destination)
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="brand" href="/" onClick={(event) => go(event, '/')}>
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>ghar ka <strong>swad</strong></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/" onClick={(event) => go(event, '/')}>The collection</a>
          <a href="/favorites" onClick={(event) => go(event, '/favorites')}>Saved recipes</a>
          <a href="/add" className="nav-add" onClick={(event) => go(event, '/add')}>
            <span aria-hidden="true">＋</span> Share a recipe
          </a>
        </nav>
      </div>
    </header>
  )
}
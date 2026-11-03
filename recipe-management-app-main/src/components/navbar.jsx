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
          <span>little <strong>recipe book</strong></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/" onClick={(event) => go(event, '/')}>Explore</a>
          <a href="/favorites" onClick={(event) => go(event, '/favorites')}>Favorites</a>
          <a href="/add" className="nav-add" onClick={(event) => go(event, '/add')}>
            <span aria-hidden="true">＋</span> Add a recipe
          </a>
        </nav>
      </div>
    </header>
  )
}

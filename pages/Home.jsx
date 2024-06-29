const { Link, NavLink } = ReactRouterDOM


export function Home() {
  return (
    <section className="home">
      <section className="main-home">
        <div className="container">
            <h2>Your Ultimate App Suite</h2>
            <p>All your favorite apps in one place. Seamless, efficient, and user-friendly.</p>
        </div>
    </section>
    
    <section id="our-apps" className="our-apps">
        <div className="container">
            <h2>Get Started with Appsus</h2>
            <p>enjoy the ultimate app suite experience.</p>
            <Link to="/note" className="app-btn">Note App</Link>
            <Link to="/mail" className="app-btn">Mail App</Link>
            <Link to="/book" className="app-btn">Book App</Link>
        </div>
    </section>
    </section>
  )
}

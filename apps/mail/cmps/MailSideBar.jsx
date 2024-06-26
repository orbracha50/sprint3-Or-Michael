const { useState } = React
const { Link } = ReactRouterDOM
export function MailSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openNav = () => {
    setIsSidebarOpen(true)
  }

  const closeNav = () => {
    setIsSidebarOpen(false)
  }

  return (
    <section>
      <h1>
        <span className="openbtn" id="openbtn" onClick={openNav}>
          &#9776;
        </span>
        Email App
      </h1>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <button className="closebtn" onClick={closeNav}>
          &times;
        </button>
        <Link to="/mail/compose">Compose</Link>
        <Link to="/mail/inbox">Inbox</Link>
        <Link to="/mail/starred">Starred</Link>
        <Link to="/mail/sent">Sent</Link>
        <Link to="/mail/drafts">Drafts</Link>
      </div>
    </section>
  )
}

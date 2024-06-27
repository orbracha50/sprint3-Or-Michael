const { useState } = React
const { Link } = ReactRouterDOM
export function MailSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const setNav = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
  }

  return (
    <section>
      <h1>
        <span className="openbtn" id="openbtn" onClick={() => setNav()}>
          &#9776;
        </span>
        Email App
      </h1>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <span className="closebtn" onClick={() => setNav()}>
          &times;
        </span>
        <button className="compose-mail">
          <Link to="/mail/compose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M209-210h58l315-315-56-57-317 318v54ZM74-74v-248l537-537q13-14 30.47-20.5Q658.93-886 677-886q17.74 0 34.87 6.5T744-860l117 115q14 14 20 31.48 6 17.49 6 36.47 0 18.05-6.5 35.55Q874-624 860-611L324-74H74Zm662-603-58-58 58 58ZM554-554l-28-28 56 57-28-29Z" />
            </svg>
            New Email
          </Link>
        </button>
        <Link to="/mail/inbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" />
          </svg>
          Inbox
        </Link>
        <Link to="/mail/starred">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
          </svg>
          Starred
        </Link>
        <Link to="/mail/sent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          </svg>
          Sent
        </Link>
        <Link to="/mail/drafts">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
          </svg>
          Drafts
        </Link>
      </div>
    </section>
  )
}

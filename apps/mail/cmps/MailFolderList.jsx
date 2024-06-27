import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailFolderFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

  useEffect(() => {
    onSetFilterDebounce.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    console.log(field, value)

    switch (target.type) {
      case "number":
      case "range":
        value = +value
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const setNav = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
  }

  return (
    <section>
      <h1>
        <span className="openbtn" id="openbtn" onClick={() => setNav()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
          Email App
        </span>
      </h1>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <section className="siderbar-componenets">
          <span className="closebtn" onClick={() => setNav()}>
            &times;
          </span>
          <Link to="/mail/compose">
            <button className="compose-mail">
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
            </button>
          </Link>
          <span>
            <svg
              onClick={() =>
                handleChange({ target: { value: "inbox", name: "status" } })
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" />
            </svg>
            Inbox
          </span>
          <span>
            <svg
              onClick={() =>
                handleChange({ target: { value: "stared", name: "status" } })
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
            </svg>
            Starred
          </span>
          <span>
            <svg
              onClick={() =>
                handleChange({ target: { value: "sent", name: "status" } })
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
            Sent
          </span>
          <span>
            <svg
              onClick={() =>
                handleChange({ target: { value: "draft", name: "status" } })
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            Drafts
          </span>
          <span>
            <svg
            onClick={() =>
                handleChange({ target: { value: "trash", name: "status" } })
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
            Trash
          </span>
        </section>
      </div>
    </section>
  )
}

import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailFolderFilter({ filterBy, onSetFilter ,onSetComposeMail }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))
  const mailId = useParams()
  useEffect(() => {
    onSetFilterDebounce.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

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
        <div className="openbtn" id="openbtn" onClick={() => setNav()}>
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
        </div>
      </h1>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <section className="siderbar-componenets">
          <div className="closebtn" onClick={() => setNav()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M190.15-298.15v-28.93h579.7v28.93h-579.7Zm0-167.7v-28.92h579.7v28.92h-579.7Zm0-167.69v-28.92h579.7v28.92h-579.7Z" />
            </svg>
          </div>
            <button className="compose-mail" onClick={() => onSetComposeMail()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M205.15-169.23q-16.03 3.35-27.65-8.27-11.62-11.62-8.27-27.65l26.92-130.12 139.12 139.12-130.12 26.92Zm130.12-26.92L196.15-335.27l432.16-431.65q17.65-17.66 43-17.66 25.34 0 43 17.66l52.61 52.61q17.66 17.66 17.66 43 0 25.35-17.66 43L335.27-196.15Zm319.11-544.81L256.54-343.88l87.34 87.34 397.08-397.84q6.92-6.93 6.92-17.31 0-10.39-6.92-17.31L689-740.96q-6.92-6.92-17.31-6.92-10.38 0-17.31 6.92Z" />
              </svg>
              New Email
            </button>
          <div
            onClick={() =>
              handleChange({ target: { value: "inbox", name: "status" } })
            }
          >
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
          </div>
          <div
            onClick={() =>
              handleChange({ target: { value: "stared", name: "status" } })
            }
          >
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
          </div>
          <div
            onClick={() =>
              handleChange({ target: { value: "sent", name: "status" } })
            }
          >
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
          </div>
          <div
            onClick={() =>
              handleChange({ target: { value: "draft", name: "status" } })
            }
          >
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
          </div>
          <div
            onClick={() =>
              handleChange({ target: { value: "trash", name: "status" } })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
            Trash
          </div>
        </section>
      </div>
    </section>
  )
}

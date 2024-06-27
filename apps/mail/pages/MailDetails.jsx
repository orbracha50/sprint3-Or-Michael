import { mailService } from "../services/mail.service.js"
const { useNavigate, useParams, Link, Outlet } = ReactRouterDOM
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const { mailId } = useParams()
  const navigate = new useNavigate()

  useEffect(() => {
    mailService.get(mailId).then((mail) => setMail(mail))
  }, [mailId])

  function markAsRead() {
    mail.isRead = true
    mailService.save(mail)
      .then(() => {
        navigate("/mail")
      })
      .catch((err) => console.log("err:", err))
  }

  function trashMail(mailId) {
    mailService.remove(mailId)
      .then(() => {
        navigate("/mail")
        showSuccessMsg(`Mail ${mailId} successfully trashed!`)
      })
      .catch((err) => {
        console.log("Problems removing mail:", err)
        showErrorMsg(`Having an issue putting mail in the bin!`)
      })
  }


  if (!mail) return <div className="mail-loader"></div>
  return (
    <section className="mail-details">
      <span onClick={() => markAsRead()}>
        <svg
        className="icon-wrap"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </span>
      <span>
      <svg
      className="icon-wrap"
        onClick={() => trashMail(mailId)}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
      </span>
      <section className="mail-header">
      <h1>{mail.subject}</h1>
      <h2>{mail.from}</h2>
      </section>
      <section className="mail-body">
        <h1>{mail.to}</h1>
        <p>{mail.body}</p>
      </section>
    </section>
  )
}

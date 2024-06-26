import { mailService } from "../services/mail.service.js"
const { useNavigate, useParams, Link, Outlet } = ReactRouterDOM

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


  if (!mail) return <div className="mail-loader"></div>
  return (
    <section className="mail-details">
      <span onClick={() => markAsRead()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </span>
      <h1>{mail.subject}</h1>
      <h2>{mail.from}</h2>
      <section className="mail-body">
        <h1>{mail.to}</h1>
        <p>{mail.body}</p>
      </section>
    </section>
  )
}

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose() {
  const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyEmail())
  const navigate = useNavigate()
  const mailId = null

  useEffect(() => {
    if (mailId) loadMail()
  }, [])

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMailToEdit)
      .catch((err) => console.log("err:", err))
  }

  function onSendMail(ev) {
    ev.preventDefault()
    mailToEdit.sentAt = Date.now()
    mailService.save(mailToEdit)
      .then(() => {
        navigate("/mail")
        //location.reload()
        showSuccessMsg(`Mail sent successfully!`)
      })
      .catch((err) => console.log("err:", err))
  }

  function onDraftMail(ev) {
    ev.preventDefault()
    if (!mailToEdit.to) {
      navigate("/mail")
      location.reload()
    }
    mailService
      .save(mailToEdit)
      .then(() => {
        navigate("/mail")
        location.reload()
        showSuccessMsg(`Mail drafted successfully!`)
      })
      .catch((err) => console.log("err:", err))
  }

  function handleChange({ target }) {
    console.log(mailToEdit)
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

    utilService.debounce(
      setMailToEdit((prevMail) => ({ ...prevMail, [field]: value })),
      5000
    )
  }

  const { to, subject, body } = mailToEdit

  return (
    <section className="email-form">
      <h2>Send Mail</h2>
      <form onSubmit={onSendMail}>
        <Link className="close-btn" onClick={onDraftMail} to="/mail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </Link>
        <label htmlFor="to">To:</label>
        <input
          value={to || ""}
          type="email"
          onChange={handleChange}
          id="to"
          name="to"
          placeholder="Recipient Email Address"
          required
        ></input>
        <label htmlFor="subject">Subject:</label>
        <input
          value={subject || ""}
          type="text"
          onChange={handleChange}
          id="subject"
          name="subject"
          placeholder="Enter Email Subject"
        ></input>
        <label htmlFor="body">Message:</label>
        <textarea
          value={body || ""}
          id="body"
          onChange={handleChange}
          name="body"
          rows="15"
          placeholder="Compose your email message here"
        ></textarea>
        <button className="submit-btn">Send Email</button>
      </form>
    </section>
  )
}

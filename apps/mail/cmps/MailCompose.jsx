import { mailService } from "../services/mail.service.js"
import {showErrorMsg,showSuccessMsg,} from "../../../services/event-bus.service.js"
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
        mailService.get(mailId)
          .then(setMailToEdit)
          .catch((err) => console.log("err:", err))
      }

    function onSendMail(ev) {
        ev.preventDefault()
        mailToEdit.sentAt = Date.now()
        mailService.save(mailToEdit)
          .then(() => {
            navigate("/mail")
            location.reload()
            showSuccessMsg(`Mail sent successfully!`)
          })
          .catch((err) => console.log("err:", err))
      }

      function onDraftMail(ev) {
        ev.preventDefault()
        if(!mailToEdit.to) return
        mailService.save(mailToEdit)
          .then(() => {
            navigate("/mail")
            location.reload()
            showSuccessMsg(`Mail drafted successfully!`)
          })
          .catch((err) => console.log("err:", err))
      }

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
    
        setMailToEdit((prevMail) => ({ ...prevMail, [field]: value }))
      }

      const { to, subject, body } = mailToEdit

      return (
            <section className="email-form">
              <h2>Send Email</h2>
              <form onSubmit={onSendMail}>
                <Link className='close-btn' onClick={onDraftMail} to='/mail'>X</Link>
                <label htmlFor="to">To:</label>
                <input value={to || ''} type="email" onChange={handleChange} id="to" name="to" placeholder="Recipient Email Address" required></input>
                <label htmlFor="subject">Subject:</label>
                <input value={subject || ''} type="text" onChange={handleChange} id="subject" name="subject" placeholder="Enter Email Subject"></input>
                <label htmlFor="body">Message:</label>
                <textarea value={body || ''} id="body" onChange={handleChange} name="body" rows="15" placeholder="Compose your email message here"></textarea>
                <button className="submit-btn">Send Email</button>
              </form>
            </section>
      )
}
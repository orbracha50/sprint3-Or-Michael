const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { DisplayIcons } from "../cmps/DisplayIcons.jsx";

export function MailPreview({ mail, deleteMail }) {
  const { subject, from, sentAt, to, body, isRead, id } = mail
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false);
  const openClass = isOpen ? "open" : ""
  const readClass = isRead ? "read" : ""

  function handleHover() {
    setIsHovering(isHovering => !isHovering);
  }

  return (
    <section className={`accordion ${openClass}`}onMouseEnter={handleHover}
    onMouseLeave={handleHover}>
      <section
        onClick={() => {
          setIsOpen((isOpen) => !isOpen)
        }}
        className={`mail-container`}
      >
        <section className={`mail-container ${readClass}`} onClick={() => {mail.isRead = true}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
          <h2>{from}</h2>
          <h4>{subject}</h4>
          <span className={isHovering ? 'visible' : 'hidden'}><DisplayIcons id={id} deleteMail={deleteMail} /></span>
          <h3 className={isHovering ? 'hidden' : 'visible'}>{new Date(sentAt).toLocaleDateString()}</h3>
          <span className="arrow">⌄</span>
        </section>
      </section>
      <section className="content">
        <article className="mail-preview">
          <h3>To: {to}</h3>
          <p>{body}</p>
        </article>
      </section>
    </section>
  )
}

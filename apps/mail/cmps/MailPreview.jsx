const { useState } = React
import { mailService } from "../services/mail.service.js";
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
export function MailPreview({ mail }) {
  const { subject, from, sentAt, to, body, isRead} = mail
  const [isOpen, setIsOpen] = useState(false)
  const openClass = isOpen ? "open" : ""
  const readClass = isRead ? "read" : ""
  
  function onSaveMail() {
    mailService.save(mail.id)
      .then(() => {
        showSuccessMsg(`Mail update saved successfully!`)
      })
      .catch((err) => console.log("err:", err))
      showErrorMsg(`Failed to update mail`)
  }

  return (
    <section className={`accordion ${openClass}`}>
    <section onClick={() => {
      mail.isRead = true
      setIsOpen((isOpen) => !isOpen)
      if(isRead) onSaveMail() 
    }} className={`mail-container mail-header`}>
      <section className={`mail-header ${readClass}`}>
      <h2>Subject: {subject}</h2>
      <h3>From: {from}</h3>
      <h4>{new Date(sentAt).toLocaleDateString()}</h4>
      <span className="arrow">⌄</span>
      </section>
    </section>
    <section className="content">
        <article className="mail-preview">
        <h3>To: {to}</h3>
        <p>Body: {body}</p>
      </article></section>
  </section>
  )
}

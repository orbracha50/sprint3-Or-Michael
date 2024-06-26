import { MailList } from "../cmps/MailList.jsx";
import {showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React


export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService.query()
      .then((mails) => {setMails(mails)
      showSuccessMsg(`Mails Loaded Successfully!`)})
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg(`Having problems loading mail!`)
      })
  }
  if (!mails) return <div className="mail-loader"></div>
  return (
    <section className="mail-index">
      <MailList mails={mails} />
    </section>
  )
}

import { MailList } from "../cmps/MailList.jsx"
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailSideBar } from "../cmps/MailSideBar.jsx"
const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService
      .query()
      .then((mails) => {
        setMails(mails)
        showSuccessMsg(`Mails Loaded Successfully!`)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg(`Having problems loading mail!`)
      })
  }

  function deleteMail(mailId) {
    mailService.remove(mailId)
      .then(() => {
        setMails((mails) => 
          mails.filter(mail => mail.id !== mailId)
      )
        showSuccessMsg(`Mail ${mailId} successfully trashed!`)
      })
      .catch((err) => {
        console.log("Problems removing book:", err)
        showErrorMsg(`Having an issue putting mail in the bin!`)
      })
  }

  function unReadMail(mailId) {
      console.log(mailId)
  }

  if (!mails) return <div className="mail-loader"></div>
  return (
    <section className="mail-index">
      <MailList mails={mails} deleteMail={deleteMail} />
    </section>
  )
}

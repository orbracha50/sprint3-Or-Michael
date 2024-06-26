import { MailList } from "../cmps/MailList.jsx"
import {showErrorMsg,showSuccessMsg,} from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailSideBar } from "../cmps/MailSideBar.jsx"
const { Link, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
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
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
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
      <button className="compose-mail">
        <Link to="/mail/compose">
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
        </Link>
      </button>
      <MailSideBar />
      <MailList mails={mails} deleteMail={deleteMail} />
      
      <Outlet />
    </section>
  )
}

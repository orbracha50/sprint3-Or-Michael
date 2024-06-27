import { MailList } from "../cmps/MailList.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderFilter } from "../cmps/MailFolderList.jsx"

const { Link, Outlet, useSearchParams } = ReactRouterDOM
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
    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
        showSuccessMsg(`Mail ${mailId} successfully trashed!`)
      })
      .catch((err) => {
        console.log("Problems removing mail:", err)
        showErrorMsg(`Having an issue putting mail in the bin!`)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  if (!mails) return <div className="mail-loader"></div>
  return (
    <section className="mail-index">
      <MailFolderFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <MailList mails={mails} deleteMail={deleteMail} />


      <Outlet />
    </section>
  )
}

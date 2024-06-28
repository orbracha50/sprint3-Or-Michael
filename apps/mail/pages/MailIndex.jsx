import { MailList } from "../cmps/MailList.jsx"
import {showErrorMsg,showSuccessMsg} from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderFilter } from "../cmps/MailFolderList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"

const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [onComposeMail, setOnComposeMail] = useState(false)

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg(`Having problems loading mail!`)
      })
  }

  function onTrashMail(mailId) {
    mailService
      .get(mailId)
      .then((mail) => ({ ...mail, ["removeAt"]: Date.now() }))
      .then((mail) => {
        mailService.save(mail)
        showSuccessMsg(`${mailId} has been sent to the trash!`)
      })
    setMails((mails) => mails.filter((mail) => mail.id !== mailId))
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  if (!mails) return <div className="mail-loader"></div>
  return (
    <section className="mail-index">
      <MailFolderFilter filterBy={filterBy} onSetFilter={onSetFilter} onComposeMail={onComposeMail}/>
      <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <MailList mails={mails} onTrashMail={onTrashMail} filterBy={filterBy} />
      {onComposeMail ? <MailCompose mails={mails} setMails={setMails} /> : null}
    </section>
  )
}

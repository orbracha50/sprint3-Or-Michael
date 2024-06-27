import { MailList } from "../cmps/MailList.jsx"
import {showErrorMsg,showSuccessMsg,} from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderFilter } from "../cmps/MailFolderList.jsx"

const { Link, Outlet, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

  useEffect(() => {
    loadMails()
    setSearchParams(filterBy)
  }, [filterBy])

  function loadMails() {
    mailService.query(filterBy)
      .then((mails) => {
        setMails(mails)
        showSuccessMsg(`Mails Loaded Successfully!`)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg(`Having problems loading mail!`)
      })
  }

  function markUnread(mailId) {
    mailService.get(mailId)
      .then((mail) => ({ ...mail, ["isRead"]: false }))
      .then((mail) => mailService.save(mail).then(loadMails()))
  }

  function trashMail(mailId) {
    mailService.get(mailId).then((mail) => ({ ...mail, ["removeAt"]: Date.now() }))
      .then((mail) => mailService.save(mail))
      setMails(mails =>
        mails.filter(mail => mail.id !== mailId)
    )
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function updateStar(mailId, isStar) {
    console.log(mailId, isStar)
    mailService
      .get(mailId)
      .then((mail) => ({ ...mail, ["isStar"]: isStar }))
      .then((updatedMail) => {
        mailService.save(updatedMail);
        setMails((prevMails) =>
          prevMails.map((mail) => (mail.id === mailId ? updatedMail : mail))
        );
      })
      .catch((err) => console.error("Error updating star state:", err));
    }

  if (!mails) return <div className="mail-loader"></div>
  return (
    <section className="mail-index">
      <MailFolderFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <MailList mails={mails} trashMail={trashMail} markUnread={markUnread} updateStar={updateStar} />

      <Outlet mails={mails}/>
    </section>
  )
}

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, trashMail, markUnread, updateStar }) {
  return (
    <ul className="mail-list">
      {mails.map((mail) => (
        <li key={mail.id}>
          <MailPreview
            mail={mail}
            trashMail={trashMail}
            markUnread={markUnread}
            updateStar={updateStar}
          />
        </li>
      ))}
    </ul>
  )
}

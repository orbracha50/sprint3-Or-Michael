import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onTrashMail, filterBy }) {
  return (
    <ul className="mail-list">
      {mails.map((mail) => (
        <li key={mail.id}>
          <MailPreview
            mail={mail}
            onTrashMail={onTrashMail}
            filterBy={filterBy}
          />
        </li>
      ))}
    </ul>
  )
}

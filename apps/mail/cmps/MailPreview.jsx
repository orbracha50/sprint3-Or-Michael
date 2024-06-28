const { useState, useEffect } = React
import { DisplayIcons } from "../cmps/DisplayIcons.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"
const { useNavigate, useParams, Link, Outlet } = ReactRouterDOM

export function MailPreview({ mail, onTrashMail }) {
  const { subject, from, sentAt, to, body, isRead, id, removeAt, isStared } =
    mail
  const [isHovering, setIsHovering] = useState(false)
  const [isStaredLocal, setIsStaredLocal] = useState(isStared)
  const [isReadLocal, setIsReadLocal] = useState(isRead)
  const navigate = useNavigate()
  const readClass = isReadLocal ? "read" : ""
  const isStar = isStaredLocal ? (
    <svg
      onClick={(event) => onStarMail(event)}
      className="icon-wrap"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#EAC452"
    >
      <g>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M0 0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      </g>
    </svg>
  ) : (
    <svg
      onClick={(event) => onStarMail(event)}
      className="icon-wrap"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
    </svg>
  )

  function onMarkUnread() {
    if (isRead) {
      setIsReadLocal((isReadLocal) => !isRead)
      mail.isRead = false
      mailService.save(mail)
    }
  }

  function onStarMail(event) {
    disableDetails(event)
    setIsStaredLocal((isStaredLocal) => !isStared)
    mail.isStared = !mail.isStared
    mailService.save(mail)
  }

  function disableDetails(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  function handleHover() {
    setIsHovering((isHovering) => !isHovering)
  }

  function handleDraft() {
    if(!sentAt) {
      navigate(`/mail/compose/${id}`)
    } else {
      navigate(`/mail/details/${id}`)
    }
  }

  return (
    <section
      onClick={handleDraft}
      className='mail-preview'
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <section className={`mail-container ${readClass}`}>
        <svg
          onClick={(event) => disableDetails(event)}
          className="icon-wrap"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
        </svg>
        {isStar}
        <h2>{from}</h2>
        <h1>{subject}</h1>
        <LongTxt txt={body} />
        <div className="email-date">
          <h1 className={isHovering ? "hidden" : "visible"}>
            {new Date(sentAt).toLocaleDateString()}
          </h1>
        </div>
        <div
          onClick={(event) => disableDetails(event)}
          className={`${isHovering ? "visible" : "hidden"}`}
        >
          <DisplayIcons id={id} onTrashMail={onTrashMail} onMarkUnread={onMarkUnread} />
        </div>
      </section>
    </section>
  )
}

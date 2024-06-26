const { useState } = React

export function Accordion({ children, subject, from, sentAt, isRead}) {
  const [isOpen, setIsOpen] = useState(false)
  const openClass = isOpen ? "open" : ""
  const readClass = isRead ? "read" : ""

  return (
    <section className={`accordion ${openClass}`}>
      <section onClick={() => {
        setIsOpen((isOpen) => !isOpen)
      }} className={`mail-container mail-header`}>
        <section className={`mail-header ${readClass}`}>
        <h3>Subject: {subject}</h3>
        <h3>From: {from}</h3>
        <h4>{sentAt}</h4>
        <span className="arrow">⌄</span>
        </section>
      </section>
      <section className="content">{children}</section>
    </section>
  )
}

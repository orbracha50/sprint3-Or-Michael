

export function NoteTxt({note}) {
    return <div className='notes' style={note.style}>
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
    </div>
}

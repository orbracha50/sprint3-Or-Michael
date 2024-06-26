

export function NoteImg({note}) {
    return <div className='notes' style={note.style}>
    <img src={note.info.url} alt="" />
    <h1>{note.info.title}</h1>
    <p>{note.info.txt}</p>
</div>
}
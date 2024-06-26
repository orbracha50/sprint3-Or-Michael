
import { NoteBar } from "./NoteBar.jsx";
export function NoteImg({note,notes}) {
    return <div className='notes' style={note.style}>
    <img src={note.info.url} alt="" />
    <h1>{note.info.title}</h1>
    <p>{note.info.txt}</p>
    <NoteBar note={note} notesTo={notes}/>
</div>
}
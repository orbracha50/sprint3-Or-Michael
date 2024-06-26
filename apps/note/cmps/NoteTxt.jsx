import { NoteBar } from "./NoteBar.jsx";


export function NoteTxt({note,notes}) {

    return <div className='notes' style={note.style}>
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
        <NoteBar note={note} notesTo={notes}/>
    </div>
}

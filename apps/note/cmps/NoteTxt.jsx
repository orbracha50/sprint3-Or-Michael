import { NoteBar } from "./NoteBar.jsx";


export function NoteTxt({note,removeNote}) {
    
    return <div className='notes' style={note.style}>
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
        <NoteBar note={note} removeNote={removeNote} />
    </div>
}

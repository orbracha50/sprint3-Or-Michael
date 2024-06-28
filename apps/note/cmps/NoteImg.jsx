
import { NoteBar } from "./NoteBar.jsx";
export function NoteImg({note,removeNote,setPinned}) {
    return <div className={(note.isPinned=== true)? 'notes pinned': 'notes'} style={note.style}>
    <img src={note.info.url} alt="" />
    <h1>{note.info.title}</h1>
    <p>{note.info.txt}</p>
    <NoteBar note={note}  removeNote={removeNote} setPinned={setPinned}/>
</div>
}
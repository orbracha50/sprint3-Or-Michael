
import { utilService } from "../../../services/util.service.js";
import { NoteImg } from "./NoteImg.jsx";
import { NodeTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({ note, removeNote, setPinned,setArchive}) {
    if (note.isPinned === true){

    }
    return <React.Fragment>
        {note.type === 'NoteTxt'  && <NoteTxt setArchive={setArchive} note={note} removeNote={removeNote} setPinned={setPinned} />}
        {note.type === 'NoteImg'  &&  <NoteImg setArchive={setArchive} note={note} removeNote={removeNote} setPinned={setPinned} />}
        {note.type === 'NoteTodos'  &&  <NodeTodos setArchive={setArchive} note={note} removeNote={removeNote} setPinned={setPinned} />}
    </React.Fragment>
}
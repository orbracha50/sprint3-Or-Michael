
import { utilService } from "../../../services/util.service.js";
import { NoteImg } from "./NoteImg.jsx";
import { NodeTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({ note, removeNote, setPinned }) {
    if (note.isPinned === true){

    }
    return <React.Fragment>
        {note.type === 'NoteTxt'  && <NoteTxt note={note} removeNote={removeNote} setPinned={setPinned} />}
        {note.type === 'NoteImg'  &&  <NoteImg note={note} removeNote={removeNote} setPinned={setPinned} />}
        {note.type === 'NoteTodos'  &&  <NodeTodos note={note} removeNote={removeNote} setPinned={setPinned} />}
    </React.Fragment>
}
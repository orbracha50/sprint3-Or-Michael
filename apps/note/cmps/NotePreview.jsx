
import { utilService } from "../../../services/util.service.js";
import { NoteImg } from "./NoteImg.jsx";
import { NodeTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({ note, removeNote }) {
    if (note.isPinned === true){

    }
    return <React.Fragment>
        {note.type === 'NoteTxt'  && <NoteTxt note={note} removeNote={removeNote} />}
        {note.type === 'NoteImg'  &&  <NoteImg note={note} removeNote={removeNote} />}
        {note.type === 'NoteTodos'  &&  <NodeTodos note={note} removeNote={removeNote} />}
    </React.Fragment>
}
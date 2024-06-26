
import { utilService } from "../../../services/util.service.js";
import { NoteImg } from "./NoteImg.jsx";
import { NodeTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({note,notes}) {
    return <section>
        {note.type === 'NoteTxt' && <NoteTxt note={note} notes={notes} />}
        {note.type === 'NoteImg' && <NoteImg note={note} notes={notes} />}
        {note.type === 'NoteTodos' && <NodeTodos note={note} notes={notes} />}
    </section>
}
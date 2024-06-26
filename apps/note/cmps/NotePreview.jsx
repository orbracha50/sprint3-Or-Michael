
import { utilService } from "../../../services/util.service.js";
import { NoteService } from "../services/note.service.js";
import { NoteImg } from "./NoteImg.jsx";
import { NodeTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({ note }) {
    function toggleTodo({ target }, todo) {
        const txt = todo
        target.classList.toggle('done')
        note.info.todos.forEach(todo => {
            if (todo.txt === txt && todo.doneAt === null) {
                todo.doneAt = utilService.getDayName(Date.now())
            } else {
                if (todo.txt === txt && todo.doneAt !== null) {
                    todo.doneAt = null
                }
            }

            console.log(note)

        });
        NoteService.save(note)
    }
    return <section>
        {note.type === 'NoteTxt' &&   <NoteTxt note={note} />}
        {note.type === 'NoteImg' &&  <NoteImg note={note} />}
        {note.type === 'NoteTodos' && <NodeTodos note={note} />}
    </section>
}
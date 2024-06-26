
import { utilService } from "../../../services/util.service.js";
import { NoteService } from "../services/note.service.js";
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
        {note.type === 'NoteTxt' &&
            <div className='notes' style={note.style}>
                <h1>{note.info.title}</h1>
                <p>{note.info.txt}</p>
            </div>}
        {note.type === 'NoteImg' &&
            <div className='notes' style={note.style}>
                <img src={note.info.url} alt="" />
                <h1>{note.info.title}</h1>
                <p>{note.info.txt}</p>
            </div>}
        {note.type === 'NoteTodos' &&
            <div className='notes' style={note.style}>
                <h1>{note.info.title}</h1>
                <ul >
                    {note.info.todos.map(todo => <div className="todo" key={todo.txt}><button className={`btn-todo ${(todo.doneAt !== null)? 'done': '' }`} onClick={(ev) => toggleTodo(ev, todo.txt)}></button><li>{todo.txt}</li></div>)}
                </ul>
            </div>}
    </section>
}
import { NoteService } from "../services/note.service.js";
import { NoteBar } from "./NoteBar.jsx";
const { useEffect, useState } = React
export function NodeTodos({ note, removeNote }) {
    const [noteToEdit, setNoteToEdit] = useState({ title: note.info.title, main: note.info.txt })
    const [toEdit, setToEdit] = useState('false')
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
        {<div className='notes' style={note.style}>
            <h1>{note.info.title}</h1>
            <ul >
                {note.info.todos.map(todo => <div className="todo" key={todo.txt}><button className={`btn-todo ${(todo.doneAt !== null) ? 'done' : ''}`} onClick={(ev) => toggleTodo(ev, todo.txt)}></button><li>{todo.txt}</li></div>)}
            </ul>
            <NoteBar note={note} removeNote={removeNote} /></div>}

    </section>

}

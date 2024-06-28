const { useState, useEffect } = React
import { NoteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
export function NoteAdd({ type, addNotetxt, setTypeNote, addNoteImage, addNoteTodos, setPinned}) {
    const [note, setNote] = useState(null)
    const [todoTitle, setTodoTitle] = useState(null)
    const [todos, setTodos] = useState([''])
    /* useEffect(()=>{
        setTodos(todos)
    },[todos]) */

    function handleChange({ target }) {

        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;

            default:
                break;
        }
        setNote(prevNote => ({ ...prevNote, [field]: value }))
    }
    function handelTodoChange({ target }, idx) {
        const field = target.name
        let value = target.value
        console.log(idx)
        if (field === 'title')
            setTodoTitle({ [field]: value })
        /* else if (todos[0] === 0) {
            setTodos([value])
            console.log(todos)
        } */

        else if (field === 'todo') {
            if (idx === 0) {
                setTodos(prevTodos => ([...prevTodos, prevTodos[0] = value]))
            } else {
                setTodos(prevTodos => ([...prevTodos, prevTodos[idx] = value]))
            }
        }


        console.log(todoTitle)
        console.log(todos)
    }

    if (type === 'text') {
        return <div className='txt-create'>
            <input onChange={handleChange} className='input-title' type="text" name="title" id="" placeholder="Title..." />
            <input onChange={handleChange} className='input-main' type="text" name="main" placeholder="Take a note..." />
            <section>
                <svg onClick={() => addNotetxt(note.title, note.main)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                <svg onClick={() => setTypeNote(null)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
            </section>

        </div>
    }
    if (type === 'image') {
        return <div>
            {/* <input type="file" id="uploadImg" onChange={handleChange} name="image" accept="image/*" /> */}
            <input type="text" id="imgFromWeb" onBlur={handleChange} name="image" placeholder="Enter url image..." />
            <input onChange={handleChange} className='input-title' type="text" name="title" id="" placeholder="Title..." />
            <svg onClick={() => addNoteImage(note.title, note.image)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
            <svg onClick={() => setTypeNote(null)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
        </div>
    }
    if (type === 'todos') {
        return <div className='txt-create'>
            <input onChange={handelTodoChange} className='input-title' type="text" name="title" id="" placeholder="Title..." />
            {/*  {todos.length === 0 && <input onBlur={handelTodoChange} key={todos[0]} className='input-main' type="text" name="extraTodo" placeholder="todo..." />} */}
            {todos.map((todo, idx) => <input key={idx} onBlur={(target) => handelTodoChange(target, idx)} value={todo.txt} className='input-main1' type="text" name="todo" placeholder="todo..." />)}
            <svg onClick={() => addNoteTodos(todos, todoTitle)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
            <svg onClick={() => setTypeNote(null)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
        </div>
    }
}

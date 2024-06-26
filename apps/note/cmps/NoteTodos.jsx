export function NodeTodos({note}) {
    return <div className='notes' style={note.style}>
        <h1>{note.info.title}</h1>
        <ul >
            {note.info.todos.map(todo => <div className="todo" key={todo.txt}><button className={`btn-todo ${(todo.doneAt !== null) ? 'done' : ''}`} onClick={(ev) => toggleTodo(ev, todo.txt)}></button><li>{todo.txt}</li></div>)}
        </ul>
    </div>
}

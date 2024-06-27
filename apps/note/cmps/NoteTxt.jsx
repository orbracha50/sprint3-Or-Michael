import { NoteBar } from "./NoteBar.jsx";

const { useEffect, useState } = React
export function NoteTxt({ note, removeNote }) {
    const [noteToEdit, setNoteToEdit] = useState({ title: note.info.title, main: note.info.txt })
    const [toEdit, setToEdit] = useState('false')

    function editNote() {
        setToEdit('true')
    }
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
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))

    }
    function saveEditNote(){
        note.info.title = noteToEdit.title
        note.info.txt = noteToEdit.main
        setToEdit('false')
    }
    return <section>
        {toEdit === 'false' && <div className='notes' style={note.style} onClick={editNote}><h1>{note.info.title}</h1> <p>{note.info.txt}</p> <NoteBar note={note} removeNote={removeNote} /> </div>}
        {toEdit === 'true' &&
            <div className='notes' style={note.style}>
                <input onChange={handleChange} key={note.info.title} value={noteToEdit.title} className='title' type="text" name="title" id="" placeholder="Title..." />
                <input onChange={handleChange} key={note.info.txt} value={noteToEdit.main} className='input-main' type="text" name="main" placeholder="Take a note..." />

                <svg onClick={saveEditNote} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" /></svg>
            </div>
        }
    </section>

}

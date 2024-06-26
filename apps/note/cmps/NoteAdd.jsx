const { useState, useEffect } = React
import { NoteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
export function NoteAdd({ type, addNotetxt}) {
    const [note, setNote] = useState(null)
    /* const [notes, setNotes] = useState(notes) */
    function handleChange({ target }) {

        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
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
        console.log(note)
    }
 
    if (type === 'text') {
        return <div className='txt-create'>
            <input onChange={handleChange} className='input-title' type="text" name="title" id="" placeholder="Title..." />
            <input onChange={handleChange} className='input-main' type="text" name="main" placeholder="Take a note..." />
            <svg onClick={()=>addNotetxt(note.title,note.main)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
        </div>
    }
}

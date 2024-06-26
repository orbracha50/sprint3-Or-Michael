const { useEffect, useState } = React
import { NoteService } from "../services/note.service.js"
export function NoteBar({ note, notesTo }) {

    const [notes, setNotes] = useState()
    useEffect(() => {
        setNotes(notesTo)
    }, [])

    function removeNote() {
        const noteId = note.id
        NoteService.remove(noteId)
        .then(() => {
            setNotes(notes =>
                notes.filter(note => note.id !== noteId)
            )
            /* showSuccessMsg(`Car (${noteId}) removed successfully!`) */
        })
        .catch(err => {
            console.log('Problems removing car:', err)
            /* showErrorMsg(`Having problems removing car!`) */
        })

    }
    return <section>
        <svg onClick={removeNote} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
    </section>
}
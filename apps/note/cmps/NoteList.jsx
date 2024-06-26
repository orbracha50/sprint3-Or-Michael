import { NoteService } from "../services/note.service.js"
import { NoteAdd } from "./NoteAdd.jsx"
import { NotePreview } from "./NotePreview.jsx"
const { useEffect, useState } = React
export function NoteList() {
    const [notes, setNotes] = useState()
    const [typeNote, setTypeNote] = useState(null)
    useEffect(() => {
        loadNotes()
        /* setSearchParams(filterBy) */
    }, [typeNote,notes])

    function loadNotes() {
        NoteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
            })
    }
    if (notes === undefined) return
    console.log(notes)
    return <section className="list-container">
        {typeNote === null&& <div className="box-note">
            <h3  onClick={()=>setTypeNote('text')}>Take a note.... </h3>
            <section>
                <svg onClick={()=>setTypeNote('todos')} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>
                <svg onClick={()=>setTypeNote('canvas')} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-120v-170l527-526q12-12 27-18t30-6q16 0 30.5 6t25.5 18l56 56q12 11 18 25.5t6 30.5q0 15-6 30t-18 27L330-120H160Zm80-80h56l393-392-28-29-29-28-392 393v56Zm560-503-57-57 57 57Zm-139 82-29-28 57 57-28-29ZM560-120q74 0 137-37t63-103q0-36-19-62t-51-45l-59 59q23 10 36 22t13 26q0 23-36.5 41.5T560-200q-17 0-28.5 11.5T520-160q0 17 11.5 28.5T560-120ZM183-426l60-60q-20-8-31.5-16.5T200-520q0-12 18-24t76-37q88-38 117-69t29-70q0-55-44-87.5T280-840q-45 0-80.5 16T145-785q-11 13-9 29t15 26q13 11 29 9t27-13q14-14 31-20t42-6q41 0 60.5 12t19.5 28q0 14-17.5 25.5T262-654q-80 35-111 63.5T120-520q0 32 17 54.5t46 39.5Z" /></svg>
                <svg onClick={()=>setTypeNote('image')} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" /></svg>
            </section>
        </div>}
         {typeNote !== null && <NoteAdd type={typeNote}/> }
        <section className="notes-list">
            {notes.map((note) => <NotePreview key={note.id} note={note}  notes={notes}/>)}
        </section>
    </section>
}
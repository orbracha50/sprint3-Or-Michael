import { AppHeaderNote } from "../cmps/AppHeaderNote.jsx";
import { NoteArchive } from "../cmps/NoteArchive.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteNav } from "../cmps/NoteNav.jsx";
const { useEffect, useState } = React
export function NoteIndex() {
    const [page, setPage] = useState('notes')
    return <main>
        <AppHeaderNote/>
        <NoteNav setPage={setPage}/>
        {page === 'notes' && <NoteList/>}
        {page === 'bin' && <NoteList/>}
        {page === 'archive' && <NoteArchive/> /* noteArchive={noteArchive} */}
    </main>
}
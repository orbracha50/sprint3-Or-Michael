import { AppHeaderNote } from "../cmps/AppHeaderNote.jsx";
import { NoteArchive } from "../cmps/NoteArchive.jsx";
import { NoteBin } from "../cmps/NoteBin.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteNav } from "../cmps/NoteNav.jsx";
const { useEffect, useState } = React
export function NoteIndex() {
    const [page, setPage] = useState('notes')
    function onSetPage(page, target) {
        const elNote = document.querySelector('.noteSvg')
        const elArch = document.querySelector('.archSvg')
        const elBin = document.querySelector('.binSvg')
console.log(elArch,elNote)
        if (page === 'notes') {

            elNote.classList.add('selected')
            elArch.classList.remove('selected')
            elBin.classList.remove('selected')

        }
        if (page === 'archive') {
            elArch.classList.add('selected')
            elNote.classList.remove('selected')
            elBin.classList.remove('selected')
        }
        if (page === 'bin') {
            elArch.classList.remove('selected')
            elNote.classList.remove('selected')
            elBin.classList.add('selected')
        }
        setPage(page)
    }
    return <main>
        <AppHeaderNote />
        <NoteNav onSetPage={onSetPage} />
        {page === 'notes' && <NoteList />}
        {page === 'bin' && <NoteBin/>}
        {page === 'archive' && <NoteArchive /> /* noteArchive={noteArchive} */}
    </main>
}
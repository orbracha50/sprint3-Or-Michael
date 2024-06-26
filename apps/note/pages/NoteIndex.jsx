import { AppHeaderNote } from "../cmps/AppHeaderNote.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteNav } from "../cmps/NoteNav.jsx";

export function NoteIndex() {

    return <main>
        <AppHeaderNote/>
        <NoteNav/>
        <NoteList/>
    </main>
}
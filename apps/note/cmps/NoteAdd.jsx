
export function NoteAdd({type}){
 if (type === 'text'){
    return <div className='txt-create'>
        <input className='input-title' type="text" name="" id="" placeholder="Title..." />
        <input className='input-main' type="text" placeholder="Take a note..."/>
    </div>
 }
}
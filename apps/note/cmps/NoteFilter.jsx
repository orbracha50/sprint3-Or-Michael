const { useState, useEffect } = React


export function NoteFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        console.log(value)
        console.log(field)
        setFilterByToEdit({[field] : value })
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    return <section>
        <form className="input-container" action="" onSubmit={onSubmitFilter}>
            <input onChange={handleChange} type="text" name="title" placeholder="search note...."/>
            <input onChange={handleChange} list="filter" name="category" placeholder="By category" />
            {/* <button onClick={onSubmitFilter} className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button> */}
        </form>
        <datalist id="filter">
            <option value="All">All notes</option>
            <option value="Text">By text</option>
            <option value="todos">By todos</option>
            <option value="image">Bt images</option>
        </datalist>
    </section>
}
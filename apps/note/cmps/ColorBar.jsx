 export function ColorBar(){

    return <article className='color-Container'>
        <div className='color-box' style={({backgroundColor: 'red'})}></div>
        <div className='color-box' style={({backgroundColor: 'black'})}></div>
        <div className='color-box' style={({backgroundColor: 'white'})}></div>
        <div className='color-box' style={({backgroundColor: 'yellow'})}></div>
        <div className='color-box' style={({backgroundColor: 'purple'})}></div>
    </article>
 }

export function LongTxt({txt, length = 70}) {
    const text = txt.slice(0, length)
    return (
        <p>{`${text}...`}</p>
    )
}
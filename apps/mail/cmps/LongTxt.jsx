
export function LongTxt({txt, length = 60}) {
    const text = txt.slice(0, length)
    return (
        <p>{`${text}...`}</p>
    )
}
import { useEffect, useState } from "react"

function getSavedValue(key, initialValue) {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
        return(savedValue)}
    if (savedValue instanceof Function) return initialValue()
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return(getSavedValue(key, initialValue))
    })
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}
import React, { useEffect, useState, memo } from "react";
import styles from './TextInput.module.css'
const TextInput = memo(({ element, setElement }) => {
    const [text, setText] = useState(element.name);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setText(newValue)
        setElement(prevElement => ({ ...prevElement, name: newValue }));
    }

    useEffect(() => { setText(element.name) }, [element])

    return (
        <input type="text" className={styles.TextInput} value={text} onChange={handleChange} placeholder='Ваш текст' />
    );
}, (prevProps, nextProps) => {
    return prevProps.element.name === nextProps.element.name;
})

export default TextInput;
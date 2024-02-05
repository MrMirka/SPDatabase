import React, { useEffect, useState, memo } from "react";
import styles from './TextInput.module.css'
const TextInputFlex = memo(({ element, setElement, placeholder, style = 'normal' }) => {
    const [text, setText] = useState(element);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setText(newValue)
        setElement(newValue);
    }

    useEffect(() => {
        setText(element)
    },
        [element])

    return (
        <input type="text" className={style==='normal' ? styles.TextInput : styles.TextInputSmall} value={text} onChange={handleChange} placeholder={placeholder} />
    );
}, (prevProps, nextProps) => {
    return prevProps.element === nextProps.element;
})

export default TextInputFlex;
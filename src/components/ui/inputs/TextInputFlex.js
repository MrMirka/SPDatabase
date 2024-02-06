import React, { memo } from "react";
import styles from './TextInput.module.css'
const TextInputFlex = memo(({ element, setElement, placeholder, style = 'normal' }) => {
  

    const handleChange = (event) => {
        const newValue = event.target.value;
        setElement(newValue);
    }

    return (
        <input type="text" className={style==='normal' ? styles.TextInput : styles.TextInputSmall} value={element} onChange={handleChange} placeholder={placeholder} />
    );
}, (prevProps, nextProps) => {
    return prevProps.element === nextProps.element;
})

export default TextInputFlex;
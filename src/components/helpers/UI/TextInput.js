import React, {useEffect, useState}from "react";
import styles from './TextInput.module.css'
function TextInput({element, setElement}) {
    const [text, setText] = useState(element.name);
    const onChandeHandle = (e) => {
        const newValue = e.target.value;
        setText(newValue)
        setElement(prevElement => ({ ...prevElement, name: newValue }));
    }

    useEffect(()=>{setText(element.name)},[element])

    return (
        <input type="text" className={styles.TextInput} value={text} onChange={onChandeHandle}/>
    );
}

export default TextInput;
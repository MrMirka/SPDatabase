import React, {useEffect, useState}from "react";
import styles from './TextInput.module.css'
function TextInput({element}) {
    const [text, setText] = useState(element.name);
    const onChandeHandle = (e) => {
        setText(e.target.value)
    }

    useEffect(()=>{setText(element.name)},[element])
    
    return (
        <input type="text" className={styles.TextInput} value={text} onChange={onChandeHandle}/>
    );
}

export default TextInput;
import React from "react";
import styles from './SearchInput.module.css'
function SearchInput({ value, setValue }) {
    const handleChangeValue = (e) => {
        setValue(e.target.value)
    }
    return (
        <>
            <input type="text" value={value} onChange={handleChangeValue} placeholder="Search" className={styles.SearchInput}></input>
        </>
    );
}

export default SearchInput;
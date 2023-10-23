import React from "react";
import styles from './InputFile.module.css'
function InputFile({setFile}) {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
      };

    return ( 
        <div className={styles.InputFileContainer}>
            <label htmlFor="file">Выбрать</label>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default InputFile;
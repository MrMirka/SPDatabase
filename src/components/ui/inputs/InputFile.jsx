import React from "react";
import styles from './InputFile.module.css'

import { getChankByType } from "../../../utils/Helpers";







function InputFile({ setFile }) {

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            //getChankByType(file, 'iTXt').then(description => { console.log(description) }).catch (error => {console.error('Ошибка при получении описания:', error);})
        }

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
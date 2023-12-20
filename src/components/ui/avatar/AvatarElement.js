import React, { useState } from "react";
import InputFile from "../inputs/InputFile";
import styles from './AvatarElement.module.css'
import { DEFAULT_EMPTY_AVATAR } from '../../structure/ComminData'


function AvatarElement({logoURL, file, setFile, imgSize, name}) {
    
    const imageSrc = file ? URL.createObjectURL(file) : logoURL;
    const imageClass = imgSize === 'small' ? styles.SmallImage : styles.BigImage;
    const imageUrl = imageSrc ? imageSrc : DEFAULT_EMPTY_AVATAR
    

    const nameMap = {
        clubGuestURL: "Клуб гость",
        clubOwnerURL: "Клуб хозяин",
        unionGuestURL: "Сборная гость",
        unionOwnerURL: "Сборная хозяин",
    }

    return (
        <div className={styles.AvatarElement}>
            <p>{nameMap[name]}</p>
            <img src={imageUrl} alt ='Форма не задана' className={imageClass}></img>
            <InputFile setFile={setFile} />
        </div>
    );
}

export default AvatarElement;
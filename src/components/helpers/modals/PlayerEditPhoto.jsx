import React, { useEffect, useState } from "react";
import styles from './Modals.module.css';
import ActionButton from "../UI/ActionButton";
import InputFile from "../UI/InputFile";
import { editPlayerUniforms, uploadFile } from "../../../utils/Controllers";
import { updatePlayerUniform } from "../../../utils/Repository";

function PlayerEditPhoto({title, onClose, player, setPlayer}) {
    const {clubOwnerURL, unionOwnerURL, clubGuestURL, unionGuestURL} = player;
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedValue, setSelectedValue] = useState(clubOwnerURL); 
    const [focusRadio, setFocusRadio] = useState('clubOwnerURL'); 

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value); 
        setFocusRadio(event.target.id); 
    };


    useEffect(()=> {
        if(selectedFile !== null) {
            uploadFile(selectedFile, 'players', (url) => {
                setSelectedValue(url);
                const updatedPlayer = { ...player };
                updatedPlayer[focusRadio] = url;
                editPlayerUniforms(updatedPlayer.id, updatedPlayer,'players',(status)=>{
                    
                    if(status) {
                        setPlayer(updatedPlayer)
                    } else {
                        console.log('Ошибка обновления записи')
                    }
                })
                
            })
        }
    }, [selectedFile])

    return (
        <div className={styles.Overlay}>
            <div className={styles.Modal}>
                <h1>{player.name}</h1>
                <p>Формы игрока</p>
                <div className={styles.Column} >
                    <input type = 'radio' id = 'clubOwnerURL' name = 'clothes' value = {clubOwnerURL} onChange={handleRadioChange} defaultChecked/>
                    <label htmlFor = 'clubOwnerURL'>Хозяин клуб</label>
                    <input type = 'radio' id = 'unionOwnerURL' name = 'clothes' value = {unionOwnerURL} onChange={handleRadioChange}/>
                    <label htmlFor = 'unionOwnerURL'>Хозяин сборная</label>
                    <input type = 'radio' id = 'clubGuestURL' name = 'clothes' value = {clubGuestURL} onChange={handleRadioChange}/>
                    <label htmlFor = 'clubGuestURL'>Гость клуб</label>
                    <input type = 'radio' id = 'unionGuestURL' name = 'clothes' value = {unionGuestURL} onChange={handleRadioChange}/>
                    <label htmlFor = 'unionGuestURL'>Гость сборная</label>
                </div>
                <div>
                    <img src={selectedValue}/>
                    <InputFile setFile={setSelectedFile}/>
                </div>
                
                <ActionButton title = {"Закрыть"} onClick = {onClose} />
            </div>
        </div>
    );
}

export default PlayerEditPhoto;
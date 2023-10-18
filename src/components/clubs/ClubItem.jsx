import React from "react";
import styles from './ClubItem.module.css'
import ActionButton from "../helpers/UI/ActionButton";
function ClubItem({title, imageUrl, onEdit, onDelete, isPlayer, editPlayer}) {
    return ( 
        <div className={styles.ClubItem}>
            <img src={imageUrl} alt ='image'></img>
            <p>{title}</p>
            <ActionButton onClick = {onEdit} title = {"Редактировать"}/>
            <ActionButton onClick = {onDelete} title = {"Удалить"}/>
            {isPlayer && <ActionButton onClick = {editPlayer} title = {"Формы"}/>}
        </div>
    );
}

export default ClubItem;
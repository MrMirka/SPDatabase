import React from "react";
import styles from './ListItem.module.css'

function ListItem({item, focusElement}) {
    const onClickHandle = (clickedItem) => {
        focusElement(clickedItem)
    }
    return (
        <div className={styles.ListItem} onClick={()=> {onClickHandle(item)}}>
            <img src={item.logoURL} alt ='image'></img>
            <p>{item.name}</p>
        </div>
    );
}

export default ListItem;
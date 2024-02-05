import React from "react";
import styles from './ListItem.module.css'

function ListItem({item, focusElement}) {
    const onClickHandle = (clickedItem) => {
        //focusElement(null)
        focusElement(clickedItem)
    }
    return (
        <div className={styles.ListItem} onClick={()=> {onClickHandle(item)}}>
            <p>{item.name}</p>
        </div>
    );
}

export default ListItem;
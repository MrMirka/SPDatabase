import React, { useState } from "react";
import styles from './ColorPicker.module.css'

const PLACEHOLDER = `conic-gradient(
    gray 0.25turn, white 0 0.5turn,
    gray 0 0.75turn, white 0 1turn
  )`;

function ColorPicker({ title, element, setElement, type }) {
    const colorKey = type === 'main' ? 'mainColor' : 'secondColor';

    const onChange = (evt) => {
        const updatedColor = evt.target.value.replace(/[^0-9a-f]/gi, "").toUpperCase();
        setElement({
            ...element,
            [colorKey]: updatedColor
        });
    };

    const outputStyle = {
        width: "20px",
        border: "1px solid",
        background: element[colorKey] && element[colorKey].length === 6 ? `#${element[colorKey]}` : PLACEHOLDER,
    };

    return (
        <div className={styles.ColorPicker}>
            <form style={{ display: "flex" }}>
                <label>
                    <input value={element[colorKey] || ''} onChange={onChange} />
                </label>
                <span style={outputStyle} />
                <span className={styles.Title}>{title}</span>
            </form>
        </div>
    );
}

export default ColorPicker;

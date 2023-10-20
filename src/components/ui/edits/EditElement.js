import React, { useEffect, useState } from "react";
import styles from './EditElement.module.css'
import { curentPlayers, curentEvents, curentClubs, curentUnions } from '../../../database/dataSlice'
import { useSelector, useDispatch } from 'react-redux';
import AvatarElement from "./AvatarElement";
import TextInput from "../../helpers/UI/TextInput";


function EditElement({ currentCollection, currentElement }) {
    const [element, setElement] = useState(currentElement)
    const [logoImage, setLogoImage] = useState(null)

    useEffect(() => {
        setElement(currentElement)
        setLogoImage(null)
    }, [currentElement])

    useEffect(() => {
        setElement(null)
        setLogoImage(null)
    }, [currentCollection])

    return (
        <div className={styles.EditElement}>
            {element &&
                <>
                    <div>
                        <AvatarElement logoURL={element.logoURL} file = {logoImage} setFile={setLogoImage} />
                        <TextInput element = {element} />
                    </div>

                </>
            }

        </div>
    );
}

export default EditElement;
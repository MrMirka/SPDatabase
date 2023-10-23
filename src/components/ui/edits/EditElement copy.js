import React, { useEffect, useState } from "react";
import styles from './EditElement.module.css'
import { updatePlayer, updateClub, updateUnion, updateEvent } from '../../../database/dataSlice'
import { useDispatch } from 'react-redux';
import AvatarElement from "./AvatarElement";
import TextInput from "../../helpers/UI/TextInput";
import { makeGroup, uploadFile } from "../../../utils/Controllers";


function EditElement({ currentCollection, currentElement }) {
    const [element, setElement] = useState(currentElement)
    const [logoImage, setLogoImage] = useState(null) //Изображение выбранное на диске
    const [makeRecord, setMakeRecord] = useState(false)

    const dispatch = useDispatch();

    /**
     * Вносим изменеие в глобальное состояние Redux
     * @param {*} collection текущая коллекция
     */
    function activateDispatch(collection) {
        switch (collection) {
            case 'players':
                dispatch(updatePlayer(element));
                break;
            case 'events':
                dispatch(updateEvent(element));
                break;
            case 'clubs':
                dispatch(updateClub(element));
                break;
            case 'unions':
                dispatch(updateUnion(element));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (makeRecord) {
            const id = element.id
            const title = element.name
            const logoURL = element.logoURL
            const collection = currentCollection
            makeGroup(id, title, logoURL, collection, (status) => {
                if (status) {
                    activateDispatch(currentCollection)
                }
            })
            setMakeRecord(false)
        }

    }, [makeRecord])

    /**
     * Обнуляем состояние елемента при смене фокуса на другой элемент вданной коллекции
     */
    useEffect(() => {
        setElement(currentElement)
        setLogoImage(null)
    }, [currentElement])

    /**
    * Обнуляем состояние елемента при смене фокуса на другую коллекцию
    */
    useEffect(() => {
        setElement(null)
        setLogoImage(null)
    }, [currentCollection])

    /**
     * Сохраняем изменения в существующую запись или создаем новыю
     */
    const handleSaveOrNew = () => {
        if (logoImage !== null) {
            uploadFile(logoImage, currentCollection, (url) => {
                setElement(prevElement => ({ ...prevElement, logoURL: url }));
                setMakeRecord(true)
            })
        } else {
            setMakeRecord(true)
        }

    }

    return (
        <div className={styles.EditElement}>
            {element &&
                <>
                    <div>
                        <AvatarElement logoURL={element.logoURL} file={logoImage} setFile={setLogoImage} />
                        <TextInput element={element} setElement={setElement} />
                        <button onClick={handleSaveOrNew}>Сохранить</button>
                    </div>

                </>
            }

        </div>
    );
}

export default EditElement;
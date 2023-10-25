import React, { useEffect, useState } from "react";
import styles from './EditElement.module.css'
import {
    updatePlayer,
    addPlayer,
    removePlayer,
    updateClub,
    addClub,
    removeClub,
    updateUnion,
    addUnion,
    removeUnion,
    addEvent,
    updateEvent,
    removeEvent

} from '../../../database/dataSlice'
import { useDispatch } from 'react-redux';
import AvatarElement from "./AvatarElement";
import TextInput from "../../helpers/UI/TextInput";
import { makeGroup, makeGroup2, uploadFile, deleteItem } from "../../../utils/Controllers";
import MyButton from "../../MyButton";
import MyLoader from "../../helpers/MyLoader";
import ColorPicker from "./ColorPicker";


function EditElement({ currentCollection, currentElement }) {

    const baseFilesState = { logoURL: null };
    const playerFilesState = {
        clubGuestURL: null,
        clubOwnerURL: null,
        unionGuestURL: null,
        unionOwnerURL: null
    };

    const initialFilesState = currentCollection === 'players' ? { ...baseFilesState, ...playerFilesState } : baseFilesState;

    const [element, setElement] = useState(currentElement)
    const [files, setFiles] = useState(initialFilesState);
    const [makeRecord, setMakeRecord] = useState(false)
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewRecord, setIsNewRecord] = useState(false); //Индикатор который показывает одновляем ты мы запись иди делаем новую
    const [isUpdatelist, setIsUpdatelist] = useState(false)


    const actionMap = {
        players: removePlayer,
        clubs: removeClub,
        unions: removeUnion,
        events: removeEvent
    }

    useEffect(() => {
        if (currentElement && currentElement.id === "") {
            setIsNewRecord(true);
        }
    }, [currentElement])


    const handleSetFile = (key) => (file) => {
        setFiles(prevFiles => ({ ...prevFiles, [key]: file }));
    };

    const uploadImagesAndGetUrls = async () => {
        const urls = await Promise.all(Object.keys(files).map((key) =>
            new Promise((resolve) => {
                if (files[key]) {
                    uploadFile(files[key], key, (url) => {
                        resolve({ key, url });
                    });
                } else {
                    resolve(null);
                }
            })
        ));
        return urls.filter(Boolean);
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        const urls = await uploadImagesAndGetUrls();
        const updatedElement = { ...element };
        urls.forEach(({ key, url }) => {
            updatedElement[key] = url;
        });

        setElement(updatedElement);
        setIsSaveClicked(true);
    };

    const handleRemove = () => {
        const status = deleteItem(element.id, currentCollection)
        if (status) {
            dispatch(actionMap[currentCollection](element))
            setElement(null)
        }

    }

    useEffect(() => {
        if (isSaveClicked) {
            setMakeRecord(true)
            setIsSaveClicked(false);
        }
    }, [element, isSaveClicked]);


    /**
     * Отслеживаем обновление поля ID при создании новой записи перед диспатчем, что бы не попало пустое значение
     */
    useEffect(() => {
        if (isUpdatelist) {
            activateDispatch(currentCollection)
            setIsUpdatelist(false)
        }
    }, [element, isUpdatelist]);


    const dispatch = useDispatch();

    /**
     * Вносим изменеие в глобальное состояние Redux
     * @param {*} collection текущая коллекция
     */
    function activateDispatch(collection) {
        switch (collection) {
            case 'players':
                isNewRecord ? dispatch(addPlayer(element)) : dispatch(updatePlayer(element));
                setIsNewRecord(false);
                break;
            case 'events':
                isNewRecord ? dispatch(addEvent(element)) : dispatch(updateEvent(element));
                setIsNewRecord(false);
                break;
            case 'clubs':
                isNewRecord ? dispatch(addClub(element)) : dispatch(updateClub(element));
                setIsNewRecord(false);
                break;
            case 'unions':
                isNewRecord ? dispatch(addUnion(element)) : dispatch(updateUnion(element));
                setIsNewRecord(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (makeRecord) {
            const obj = {
                id: element.id,
                name: element.name,
                logoURL: element.logoURL
            }
            if (currentCollection === 'players') {
                obj['clubGuestURL'] = element.clubGuestURL
                obj['clubOwnerURL'] = element.clubOwnerURL
                obj['unionGuestURL'] = element.unionGuestURL
                obj['unionOwnerURL'] = element.unionOwnerURL
            }
            if (currentCollection === 'clubs' || currentCollection === 'unions') {
                obj['mainColor'] = element.mainColor
                obj['secondColor'] = element.secondColor
            }
            const collection = currentCollection
            makeGroup2(obj, collection, (id) => {
                if (id && id !== 1) {
                    setElement({ ...element, id: id })
                    setIsUpdatelist(true)
                } else if (id == 1) {
                    activateDispatch(currentCollection)
                }
            })
            setMakeRecord(false)
            setIsLoading(false)
        }

    }, [makeRecord])

    /**
     * Обнуляем состояние елемента при смене фокуса на другой элемент вданной коллекции
     */
    useEffect(() => {
        setElement(currentElement)
        const newFilesState = currentCollection === 'players' ? { ...baseFilesState, ...playerFilesState } : baseFilesState;
        setFiles(newFilesState);
    }, [currentElement])

    /**
    * Обнуляем состояние елемента при смене фокуса на другую коллекцию
    */
    useEffect(() => {
        setElement(null)
        const newFilesState = currentCollection === 'players' ? { ...baseFilesState, ...playerFilesState } : baseFilesState;
        setFiles(newFilesState);
    }, [currentCollection])


    return (
        <div className={styles.EditElement}>
            {element &&
                <>
                    <div className={styles.Loader}>
                        {isLoading && <MyLoader />}
                    </div>

                    <div className={styles.InfoBlock}>
                        <AvatarElement
                            key="logoURL"
                            file={files.logoURL}
                            setFile={handleSetFile("logoURL")}
                            logoURL={element.logoURL}
                            imgSize={'small'}
                        />
                        <TextInput element={element} setElement={setElement} />
                    </div>

                    {element.mainColor && element.secondColor &&
                        <div>
                            <ColorPicker title={'Основной цвет'} element={element} setElement={setElement} type ={'main'}/>
                            <ColorPicker title={'Дополнительный цвет'} element={element} setElement={setElement}  type ={'second'}/>
                        </div>

                    }

                    <div className={styles.UniformBlock}>
                        {Object.entries(files).filter(([key]) => key !== 'logoURL').map(([key, file]) => (
                            <AvatarElement
                                name={key}
                                key={key}
                                file={file}
                                setFile={handleSetFile(key)}
                                logoURL={element[key]}
                                imgSize={'big'}
                            />
                        ))}
                    </div>
                    <div className={styles.Controls}>
                        <MyButton onClick={handleSubmit}>Сохранить</MyButton>
                        <MyButton onClick={handleRemove}>Удалить</MyButton>
                    </div>

                </>
            }

        </div>
    );
}

export default EditElement;
import React, { useEffect, useState } from "react";
import styles from './EditElement.module.css'
import { updatePlayer, updateClub, updateUnion, updateEvent } from '../../../database/dataSlice'
import { useDispatch } from 'react-redux';
import AvatarElement from "./AvatarElement";
import TextInput from "../../helpers/UI/TextInput";
import { makeGroup, makeGroup2, uploadFile } from "../../../utils/Controllers";
import MyButton from "../../MyButton";
import MyLoader from "../../helpers/MyLoader";


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

    useEffect(() => {
        if (isSaveClicked) {
            setMakeRecord(true)
            setIsSaveClicked(false);
        }
    }, [element, isSaveClicked]);








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
            const collection = currentCollection
            makeGroup2(obj, collection, (status) => {
                if (status) {
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
                    <div className={styles.UniformBlock}>
                        {Object.entries(files).filter(([key]) => key !== 'logoURL').map(([key, file]) => (
                            <AvatarElement
                                name = {key}
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
                    </div>
                    
                </>
            }

        </div>
    );
}

export default EditElement;
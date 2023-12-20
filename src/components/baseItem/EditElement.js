import React, { useEffect, useState } from "react";
import styles from './EditElement.module.css'
import { useSelector } from 'react-redux';
import { curentClubs, curentUnions } from '../../database/dataSlice'
import {
    removePlayer,
    removeClub,
    removeUnion,
    removeEvent

} from '../../database/dataSlice'
import { useDispatch } from 'react-redux';
import AvatarElement from "../ui/avatar/AvatarElement";
import TextInput from "../ui/inputs/TextInput";
import { makeGroup, deleteItem, uploadImagesAndGetUrls } from "../../utils/Controllers";
import MyLoader from "../helpers/MyLoader";
import ColorPicker from "../ui/color/ColorPicker";
import CounturButton from "../ui/buttons/CounturButton";
import DropList from "../ui/drop/DropList";
import { activateDispatch } from "../../database/databaseUtility";
import { getObjectForSubmin } from "../../utils/Models";


function EditElement({ currentCollection, currentElement }) {

    const baseFilesState = { logoURL: null };
    const playerFilesState = {
        clubGuestURL: null,
        clubOwnerURL: null,
        unionGuestURL: null,
        unionOwnerURL: null
    };

    const initialFilesState = currentCollection === 'players' ? { ...baseFilesState, ...playerFilesState } : baseFilesState;

    const [element, setElement] = useState(currentElement) //Выбранный лемент из коллекции
    const [files, setFiles] = useState(initialFilesState); //Записи соотвествия файлой типу и типов форм
    const [makeRecord, setMakeRecord] = useState(false)
    const [isSaveClicked, setIsSaveClicked] = useState(false); //Состояние кнопки "Сохранить"
    const [isLoading, setIsLoading] = useState(false); //Видимость лоудера
    const [isNewRecord, setIsNewRecord] = useState(false); //Индикатор который показывает одновляем мы запись иди делаем новую
    const [isUpdatelist, setIsUpdatelist] = useState(false)


    const clubs = useSelector(curentClubs)
    const unions = useSelector(curentUnions)

    const dispatch = useDispatch();

    const actionMap = {
        players: removePlayer,
        clubs: removeClub,
        unions: removeUnion,
        events: removeEvent
    }

    //Устанавливаем статус если запись новая
    useEffect(() => {
        if (currentElement && currentElement.id === "") {
            setIsNewRecord(true);
        }
    }, [currentElement])


    const handleSetFile = (key) => (file) => {
        setFiles(prevFiles => ({ ...prevFiles, [key]: file }));
    };

    /**
     * Инициалицизуем сохранинеи записи
     * на этом этапе сохраняем файлы в Store и получаем их URL
     * которые сохраняем в текушем элементе
     */
    const handleSubmit = async () => {
        setIsLoading(true)
        const urls = await uploadImagesAndGetUrls(files, currentCollection);
        const updatedElement = { ...element };
        urls.forEach(({ key, url }) => {
            updatedElement[key] = url;
        });

        setElement(updatedElement);
        setIsSaveClicked(true);
    };

    //Удаляем запись
    const handleRemove = () => {
        const status = deleteItem(element.id, currentCollection)
        if (status) {
            dispatch(actionMap[currentCollection](element))
            setElement(null)
        }
    }

    /**
     * Эффект запускается в случае изменения состояния нажатия кнопки
     * и изменения состояния текушего объекта, что сигнализирует необходимости
     * сонхронизации с сервером
     */
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
            activateDispatch(dispatch, element, currentCollection, isNewRecord, setIsNewRecord)
            setIsUpdatelist(false)
        }
    }, [element, isUpdatelist]);



    /**
     * Записывает данные на сервер
     */
    useEffect(() => {
        if (makeRecord) {
            const obj = getObjectForSubmin(element, currentCollection)
            makeGroup(obj, currentCollection, (id) => {
                if (id && id !== 1) {
                    setElement({ ...element, id: id })
                    setIsUpdatelist(true)
                } else if (id == 1) {
                    activateDispatch(dispatch, element, currentCollection, isNewRecord, setIsNewRecord)
                }
            })
            setMakeRecord(false)
            setIsLoading(false)
        }

    }, [makeRecord])

    /**
     * Обнуляем состояние елемента при смене фокуса на другой элемент в данной коллекции
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
                        <div className={styles.PickersBlock}>
                            <ColorPicker title={'Основной цвет'} element={element} setElement={setElement} type={'main'} />
                            <ColorPicker title={'Дополнительный цвет'} element={element} setElement={setElement} type={'second'} />
                        </div>

                    }
                    {currentCollection === 'players' &&
                        (
                            <>
                                <DropList type={'club'} list={clubs} element={element} selectItem={setElement}></DropList>
                                <DropList type={'union'} list={unions} element={element} selectItem={setElement}></DropList>
                            </>
                        )
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
                        <CounturButton onClick={handleSubmit}>Сохранить</CounturButton>
                        <CounturButton onClick={handleRemove}>Удалить</CounturButton>
                    </div>

                </>
            }

        </div>
    );
}

export default EditElement;
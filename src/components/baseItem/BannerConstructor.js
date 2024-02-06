import React, { useEffect, useState } from "react";
import styles from './BannerConstructor.module.css'
import TextInputFlex from "../ui/inputs/TextInputFlex";
import { useSelector } from 'react-redux';
import { curentEvents, curentClubs, curentUnions, curentPlayers } from '../../database/dataSlice'
import DropListFlex from "../ui/drop/DropListFlex";
import { getPlayersByGroup } from "../../utils/Models";
import CounturButton from "../ui/buttons/CounturButton";

function BannerConstructor({ currentCollection, element }) {
    const [banner, setBanner] = useState(element)
    const [bannerName, setBannerName] = useState("")
    const [bannerTeamplate, setBannerTeamplate] = useState("")
    const [event, setEvent] = useState(null)
    const [leftLogo, setLeftLogo] = useState(null)
    const [rightLogo, setRightLogo] = useState(null)
    const [leftPlayer, setLeftPlayer] = useState(null)
    const [rightPlayer, setRightPlayer] = useState(null)
    const [leftPlayersFilter, setLeftPlayerFilter] = useState([])
    const [rightPlayersFilter, setRightPlayerFilter] = useState([])
    const [leftLogoCaption, setLeftLogoCaption] = useState('')
    const [rightLogoCaption, setRigthLogoCaption] = useState('')
    const [dateCaption, setDateCaption] = useState('')
    const [contentCaption, setContentCaption] = useState('')
    const [eventCaption, setEventCaption] = useState('')



    const clubs = useSelector(curentClubs)
    const unions = useSelector(curentUnions)
    const events = useSelector(curentEvents)
    const players = useSelector(curentPlayers)
    const groups = [...clubs, ...unions]

    const handleSubmit = () => { }
    const handleRemove = () => { }

    useEffect(() => {
        if (element && element.param) {
            setEvent(element.param.eventCaption)
            setLeftLogo(element.param.leftLogoCaption)
            setLeftPlayer(element.param.leftPlayerName)
            setRightLogo(element.param.rightLogoCaption)
            setRightPlayer(element.param.rigthPlayerName)
            setLeftLogoCaption(element.param.leftLogoCaption)
            setRigthLogoCaption(element.param.rightLogoCaption)
            setEventCaption(element.param.eventCaption)
            setDateCaption(element.param.date)
            setContentCaption(element.param.title)

        }
    }, [element])

    useEffect(() => { console.log(leftLogo) }, [leftLogo])

    useEffect(() => {
        if (leftLogo) {
            const filter = getPlayersByGroup(players, leftLogo)
            setLeftPlayerFilter(filter)
        }
    }, [leftLogo])

    useEffect(() => {
        if (rightLogo) {
            const filter = getPlayersByGroup(players, rightLogo)
            setRightPlayerFilter(filter)
        }
    }, [rightLogo])

    useEffect(() => {
        if (banner) {
            setBannerName(banner.name)
            setBannerTeamplate(banner.teamplate)
        }
    }, [banner])

    //Создаем локальную копию выдленного объекта
    useEffect(() => {
        setBanner(element)
    }, [element])

    //Сбрасываем объект при смене главного рахдела меню
    useEffect(() => {
        setBanner(null)
    }, [currentCollection]
    )

    return (
        <div className={styles.ConstructorBlock}>
            {banner &&
                <>
                    <TextInputFlex element={bannerName} setElement={setBannerName} placeholder={"Имя баннера"} />
                    <TextInputFlex element={bannerTeamplate} setElement={setBannerTeamplate} placeholder={"Имя шаблона"} />
                    <div className={styles.EventBlock}>
                        <DropListFlex title={'Событие'} list={events} element={event} setElement={setEvent} />
                    </div>
                    <div className={styles.LeftRightBlock}>
                        <div className={styles.LeftBlock}>
                            <p>Левый блок</p>
                            {(leftLogo && groups.length > 0) && <DropListFlex title={'Группа'} list={groups} element={leftLogo} setElement={setLeftLogo} />}
                            {(leftPlayersFilter.length > 0 && leftPlayer) && <DropListFlex title={'Игрок'} list={leftPlayersFilter} element={leftPlayer} setElement={setLeftPlayer} />}
                        </div>
                        <div className={styles.RightBlock}>
                            <p>Правый блок</p>
                            {(rightLogo && groups.length > 0) && <DropListFlex title={'Группа'} list={groups} element={rightLogo} setElement={setRightLogo} />}
                            {(rightPlayersFilter.length > 0 && rightPlayer) && <DropListFlex title={'Игрок'} list={rightPlayersFilter} element={rightPlayer} setElement={setRightPlayer} />}
                        </div>

                    </div>
                    <div className={styles.Content}>
                        <h3>Текстовой блок</h3>
                        <div>
                            <span className={styles.Caption} >Событие</span>
                            <TextInputFlex element={eventCaption} setElement={setEventCaption} placeholder={"Введите ваш текст"} style={'small'} />
                        </div>
                        <div>
                            <span className={styles.Caption} >Левый лого</span>
                            <TextInputFlex element={leftLogoCaption} setElement={setLeftLogoCaption} placeholder={"Введите ваш текст"} style={'small'} />
                        </div>
                        <div>
                            <span className={styles.Caption} >Правый лого</span>
                            <TextInputFlex element={rightLogoCaption} setElement={setRigthLogoCaption} placeholder={"Введите ваш текст"} style={'small'} />
                        </div>
                        <div>
                            <span className={styles.Caption} >Дата события</span>
                            <TextInputFlex element={dateCaption} setElement={setDateCaption} placeholder={"Введите ваш текст"} style={'small'} />
                        </div>
                        <div>
                            <span className={styles.Caption} >Сообщение</span>
                            <TextInputFlex element={contentCaption} setElement={setContentCaption} placeholder={"Введите ваш текст"} style={'small'} />
                        </div>

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

export default BannerConstructor;
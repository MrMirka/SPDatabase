import React from "react";
import { useState } from "react";
import { signEmailPass } from "../../utils/Repository";
import MyInput from "../ui/inputs/MyInput";
import MyButton from "../ui/buttons/MyButton";
import styles from './Authentication.module.css'
import { useNavigate } from 'react-router-dom';
 import { setAuth } from "../../database/dataSlice";
import { useDispatch } from "react-redux";

function Authentication ({setStatus}) {
    const [authContent, setAuthContent] = useState({name: "", password:""})
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onChange  = (e) => {
        const key = e.target.name
        const value = e.target.value
        setAuthContent((old) => ({...old, [key]:value}))
    }

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const authData = await signEmailPass(authContent.name, authContent.password);
            if (authData) {
                const uid = authData.email;
                dispatch(setAuth(uid))
                setStatus(true);
                navigate('/database');
              } else {
                setStatus(false);
              }
        } catch (error) {
            console.log('Authentication error:', error.message)
        }
    } 

    return ( 
        <div className={styles.Authentication}>
            <div className={styles.Container}>
            <h1>База данных</h1>
            <form>
                <MyInput name = {'name'} value={authContent.name} onChange = { onChange } type="text"  placeholder="name"></MyInput>
                <MyInput name = {'password'} value={authContent.password} onChange = { onChange } type="password"  placeholder="passowrd"></MyInput>
                <MyButton onClick={handleAuth}>Войти</MyButton>
            </form>
            </div>
        </div>
     );
}

export default Authentication ;

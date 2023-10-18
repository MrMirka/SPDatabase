import React from "react";
import styles from './Modals.module.css'
import { useState, useEffect } from "react";
import MyInput from "../../MyInput";
import ErrorBlock from "../UI/ErrorBlock";
import InputFile from "../UI/InputFile";
import { makeGroup, uploadFile } from "../../../utils/Controllers";
import ActionButton from "../UI/ActionButton";

function ModalGroup({title, isOpen, onClose, dataForEdit}) {
    const [groupName, setGroupName] = useState("")
    const [logoUrl, setLogoUrl] = useState("");
    const [errorData, setErrorData] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [idRecord, setIdRecord] = useState("");
    const [isSend, setIsSend] = useState(false);

    function clearForm(){
      setGroupName("");
      setLogoUrl("");
      setSelectedFile(null);
      setErrorData("");
      setIsSend(false);
    }

    useEffect(()=>{ return () => { clearForm() } }, [] );

    useEffect(()=>{
      if(dataForEdit) {
        setIdRecord(dataForEdit.id);
        setGroupName(dataForEdit.name);
      }
    },[dataForEdit])
 

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isOpen]);


     function upData() {
      if(selectedFile !== null) {
        uploadFile(selectedFile, title, (url) => {
          if(url!==null) {
            setLogoUrl(url);
          }else{
            setErrorData("Ошибка загрузки изображения")
            clearForm();
          }
        }); 
      } else {
        setIsSend(true);
      }
     }

     useEffect(() => {
      if (logoUrl !== "" || isSend) {
          makeGroup(idRecord, groupName, logoUrl, title, ((status) => {
          if(status) {
            clearForm();
            onClose();
          } else {
            setErrorData("Что то пошло не так")
          }
          
        }))
      }
    }, [logoUrl, isSend]);

    const handleClose = () => {
      onClose()
      setIsSend(false);
    }

    return ( 
        <div className={styles.Overlay}>
            <div className={styles.Modal}>
              <h2>Добавить {title}</h2>
              <MyInput value={groupName} onChange = { e => setGroupName(e.target.value) } type="text"  placeholder="Group name"></MyInput>
              <ErrorBlock error={errorData} />
              <InputFile setFile={setSelectedFile}/>
              <ActionButton onClick={upData} title="Создать"/>
              <ActionButton onClick={handleClose} title="Закрыть"/>
            </div>
            
        </div>
    );
}

export default ModalGroup;
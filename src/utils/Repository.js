import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const FIREBASE_API_KEY = 'AIzaSyCsKfZrEwwV9Hc4kPr6aNsV5KAeY6ImpU4';
//const PROJECT_ID = 'sportbanners-1163a';
//const ACCESS_TOKEN = ''


//Авторизуемся по email
export const signEmailPass = async (email, password) => {
  const auth = getAuth();
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Ошибка авторизации:', error.message);
    throw error; 
  }
};

/**
 * Получаем коллекции 
 * @param {*} name - имя коллекции
 * @returns 
 */
export const fetchCollection = async (name) => {
  const db = getFirestore();
  const clubsCollection = collection(db, name);

  try {
    const querySnapshot = await getDocs(clubsCollection);
    return querySnapshot;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return null;
  }
};

/**
 * Загружаем файл в хранилище Firebase
 * @param {*} selectedFile выбранный файл
 * @param {*} subFolder подпапка в папке images
 * @returns URL файла
 */
export const uploadToFirebase = (selectedFile, subFolder) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${subFolder}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Здесь можно отобразить прогресс загрузки
          //console.log(snapshot)
        },
        (error) => {
          console.error('Ошибка загрузки:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            resolve(downloadURL);
          } catch (error) {
            console.error('Не могу получить URL файла:', error);
            reject(error);
          }
        }
      );
    });
  };

  /**
   * Создаем новую группу в Firestore Database
   * @param {*} name имя группы
   * @param {*} logoUrl url картинки логотипа
   */
  export const addGroup = async (name, logoUrl, groupName) => {
    const db = getFirestore();
    const clubsCollection = collection(db, groupName);
  
    try {
      const newClubRef = await addDoc(clubsCollection, {
        name: name,
        logoURL: logoUrl
      });
  
      console.log('Новая запись добавлена с ID:', newClubRef.id);
      return true;
    } catch (error) {
      console.error('Ошибка при добавлении записи:', error);
      return false;
    }
  };

  /**
   * Обновдяем запись в коллекции
   * @param {*} id - id группы
   * @param {*} name - имя
   * @param {*} logoURL - url картинки
   * @param {*} groupName - имя коллекции в которой обновляем запись
   * @returns 
   */
  export const updateGroup = async (id, name, logoURL, groupName) => {
    const db = getFirestore();
    const clubDocRef = doc(db, groupName, id);

    const updatedFields = {
      name: name
    };
    if (logoURL !== "") {
      updatedFields.logoURL = logoURL;
    }
  
    try {
      await updateDoc(clubDocRef, updatedFields);
  
      console.log('Запись обновлена');
      return true;
    } catch (error) {
      console.error('Ошибка при обновлении записи:', error);
      return false;
    }
  };

  /**
   * Редактируем картинки с формой игрока
   * @param {*} id ID игрока
   * @param {*} player объект в котором содержатся URL к картинкам
   * @param {*} groupName имя коллекции
   * @returns 
   */
  export const updatePlayerUniform = async (id, player, groupName) => {
    const db = getFirestore();
    const playerDocRef = doc(db, groupName, id);

    const updateFields = {
      clubGuestURL: player.clubGuestURL !== undefined ? player.clubGuestURL : "",
      clubOwnerURL: player.clubOwnerURL !== undefined ? player.clubOwnerURL : "",
      unionGuestURL: player.unionGuestURL !== undefined ? player.unionGuestURL : "",
      unionOwnerURL: player.unionOwnerURL !== undefined ? player.unionOwnerURL : ""
    }

    try {
      await updateDoc(playerDocRef, updateFields)
      console.log('Зпись игрока обновленна')
      return true;
    } catch (error) {
      console.log('Ошибка при обновлении записи игрока:',error);
      return false;
    }
  }

  /**
   * Удаление записи
   * @param {*} id id записи
   * @param {*} collectionName имя коллекции в которой удаляем запись
   * @returns 
   */
  export const deleteDocumentById = async (id, collectionName) => {
    const db = getFirestore();
    const clubDocRef = doc(db, collectionName, id);
  
    try {
      await deleteDoc(clubDocRef);
      console.log('Запись удалена');
      return true;
    } catch (error) {
      console.error('Ошибка при удалении записи:', error);
      return false;
    }
  };

  
  




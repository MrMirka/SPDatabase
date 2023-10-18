import styles from './App.module.css'
import Authentication from './Authentication';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.App}>

       {!authStatus ? (
        <div>
        <Authentication setStatus={setAuthStatus}/>
        </div>
      ) : (
        navigate('database')
      )} 
         
    </div>
    
    
  );
}

export default App;

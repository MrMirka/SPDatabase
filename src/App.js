import styles from './App.module.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from './components/Authentication';

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

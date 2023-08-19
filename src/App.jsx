import './App.css'
import {useLocation} from "react-router-dom";
import {db} from "./Firebase.js"
import {doc,getDoc} from "firebase/firestore"
import {useEffect, useState} from "react";

function App() {

  const [user,setUser] = useState({})

  const {state} = useLocation();
  const { id } = state; // Read values passed on state




  useEffect(() => {
      const userPromise = doc(db, "users", id)
      getDoc(userPromise)
          .then((docSnapshot) => {
              if (docSnapshot.exists()) {

                  setUser({
                      username:docSnapshot.data().username,
                      password:docSnapshot.data().password,
                      id:id
                  })

              } else {
                  console.log("User not found!");
              }
          })
          .catch((error) => {
              console.error("Error getting user document:", error);
          });
  },[id])



  return (
    <>
      <p>{`Welcome back ${user.username} with id ${user.id} and with password: ${user.password}`}</p>
    </>
  )
}

export default App

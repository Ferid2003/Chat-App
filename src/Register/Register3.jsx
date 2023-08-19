import {useEffect, useState} from "react";
import {usersCollection} from "../Firebase.js";
import {useLocation, useNavigate} from "react-router-dom";
import {addDoc, onSnapshot} from "firebase/firestore";
import {useAuth} from "../Authentication/AuthContext.jsx";



function Register3(){
    const navigate = useNavigate()
    const {us,user} = useAuth()

    const [username,setUsername] = useState()
    const [loading,setLoading] = useState(false)
    const [users,setUsers] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(usersCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const usersArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setUsers(usersArr)
            for (let i = 0; i<users.length; i++){
                if (users[i].UID===user.uid){
                    navigate("/login")
                }
            }
        })
        return unsubscribe
    }, [])



    function handleChange(event){
        setUsername(event.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const newUser = {
            username:username,
            email:user.email,
            UID:user.uid,
            profile_pic:"https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png",
        }
        try{
            await addDoc(usersCollection, newUser)
            navigate("/login")
        }catch {
            return "Error"
        }
    }



    return (
        <div>
            <div className="left"></div>
            <div className="circle"></div>
            <div className="top-right"></div>
            <div className="bottom-right"></div>
            <div className="bottom-right2"></div>
            <div className="bottom-right3"></div>
            <div className="login-container">
                <div className="login-cont-holder">
                    <h1 className="title">Register</h1>
                    <form className="login-form">
                        <input onChange={handleChange} name="username" type="text" className="username" placeholder="Username"/>
                        <button disabled={loading} onClick={handleSubmit} className="login">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register3;
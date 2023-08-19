import {useNavigate} from "react-router-dom";
import {useAuth} from "../Authentication/AuthContext.jsx";
import Switch from '@mui/material/Switch';
import {useEffect, useState} from "react";

function SideBar() {

    const {logOut, us} = useAuth()
    const navigate = useNavigate()
    const [style,setStyle] = useState({backgroundImage: "url(" + "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png" + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "48px",
        height: "50px",
        width: "50px",
        marginRight: "12px"})
    const [username,setUsername] = useState("")
    const [clicked,setClicked] = useState(localStorage.getItem("mode") === 'false')

    useEffect(() => {
        setStyle({backgroundImage: "url(" + "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png" + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "48px",
            height: "50px",
            width: "50px",
            marginRight: "12px"})
        setUsername("")
        async function sui(){
            const data = await us.data()
            setStyle({
                backgroundImage: "url(" + data.profile_pic + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "48px",
                height: "50px",
                width: "50px",
                marginRight: "12px"
            })
            setUsername(us.data().username)
        }
        sui()
    },[us])

    function toggleDarkMode(e){
        e.preventDefault()
        localStorage.removeItem("mode")
        localStorage.setItem("mode",clicked.toString())
        const light = () =>{
            document.querySelector(':root').style.backgroundColor= "#E8EAF6"
            document.querySelector(':root').style.color= "#3949AB"

        }
        const dark = () => {
            document.querySelector(':root').style.backgroundColor= "#1C1C1E"
            document.querySelector(':root').style.color= "#FFFFFF"
        }
        !clicked ? light() : dark()
        setClicked(prevState => !prevState)

    }




    return (
        <div id="sidebar" style={{
            paddingTop: "20px",
            height: "100vh",
            position: "fixed",
            width: "15vw",
            display: "flex",
            flexDirection: "column",
            backgroundColor: clicked ? "#FFFFFF":"#212121",
            color: clicked ? "#3949AB":"#FFFFFF" ,
            borderRight: "2px solid #424242"
        }}>
            <div className="action-holder"
                 style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "22px"}}>
                <div className=""
                     style={{display: "flex", alignItems: "center", width: "13vw", justifyContent: "left"}}>
                    <div className="profile-avatar" style={style}></div>
                    <div className="profile-name" >{username}</div>
                </div>
                {window.location.pathname === "/chat" ? <div onClick={() => navigate("/gpt")} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "gpt-img" : "gpt-img-light"}></div>
                    <h2 style={{ fontSize: "15px"}}>Chat GPT</h2>
                </div> : <div onClick={() => navigate("/chat")} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "chat-img img" : "chat-img-light img"}></div>
                    <h2 style={{fontSize: "15px"}}>Chat</h2>
                </div>}
                {window.location.pathname === "/update" && <div onClick={() => navigate("/gpt")} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "gpt-img" : "gpt-img-light"}></div>
                    <h2 style={{fontSize: "15px"}}>Chat GPT</h2>
                </div>}
                {window.location.pathname !== "/update" && <div onClick={() => navigate("/update")} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "setting-img img": "setting-img-light img"}></div>
                    <h2 style={{fontSize: "15px"}}>Settings</h2>
                </div>}
            </div>
            <div style={{
                display: "flex",
                height: "75vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "22px"
            }}>
                <div onClick={() => window.location = 'mailto:Farid.Aghazada@edu.rtu.lv'} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "help-img img" : "help-img-light img"}></div>
                    <h2 style={{fontSize: "15px"}}>Help Center</h2>
                </div>
                <div onClick={logOut} className={!clicked? "block" : "block-light"}>
                    <div className={!clicked ? "logOut-img img" : "logOut-img-light img"}></div>
                    <h2 style={{fontSize: "15px"}}>Log out</h2>
                </div>
                <div className="block2">
                    <div className={!clicked ? "theme-img img" : "theme-img-light img"}></div>
                    <h2 style={{fontSize: "15px"}}>Night Mode</h2>
                    <Switch checked={!clicked} onChange={toggleDarkMode}/>
                </div>
            </div>
        </div>

    )
}

export default SideBar;
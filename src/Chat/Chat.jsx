import "./Chat.css"
import {useEffect, useState} from "react";
import {addDoc, onSnapshot} from "firebase/firestore";
import {messagesCollection, storage, usersCollection} from "../Firebase.js";
import Message from "../Message/Message.jsx";
import Split from 'react-split'
import {useAuth} from "../Authentication/AuthContext.jsx";
import {  query, where, getDocs } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import SideBar from "./test1.jsx";



function Chat() {


    const {user,us} = useAuth()

    const [sortedMessages, setSortedMessages] = useState([])
    const [input, setInput] = useState("")
    const [filePress, setFilePress] = useState(false)
    // const [menuPress, setMenuPress] = useState(false)
    const [mesComponents, setMesComponents] = useState([]);
    const [picture, setPicture] = useState(null)
    const [clicked,setClicked] = useState(localStorage.getItem("mode") === 'false')





    useEffect(() => {
        const qa = onSnapshot(messagesCollection, function (snapshot) {
            const mes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))

            setSortedMessages(mes.sort((a, b) => a.createdAt - b.createdAt))
        })
        const light = () =>{
            document.querySelector(':root').style.backgroundColor= "#E8EAF6"
            document.querySelector(':root').style.color= "#3949AB"

        }
        const dark = () => {
            document.querySelector(':root').style.backgroundColor= "#1C1C1E"
            document.querySelector(':root').style.color= "#FFFFFF"
        }
        clicked ? light() : dark();
        return qa
    }, []);

    useEffect(() => {
        Promise.all(sortedMessages.map(message => getUserPic(message).then(userPicData => {
            const picture = userPicData ? userPicData.profile_pic : "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png";
            return (
                <Message
                    message={message.message}
                    userUid={message.userUID}
                    username={message.user}
                    passedUserUid={user.uid}
                    key={message.id}
                    id={message.id}
                    time={message.createdAt}
                    profilePic={picture}
                />
            );
        }))).then(components => setMesComponents(components));
    }, [sortedMessages])

    async function getUserPic(message) {
        if (message) {
            const q2 = await query(usersCollection, where("UID", "==", message.userUID));
            const userDocs = await getDocs(q2);
            if (userDocs.docs.length > 0) {
                const uss = userDocs.docs[0].data();
                return uss;
            } else {
                return null; // Return null or a default value if user data is not found
            }
        }
    }


    // const mesComponents = sortedMessages.map(async message => {
    //     const userPicData = await getUserPic(message);
    //     const picture = userPicData ? userPicData.profile_pic : 'default_profile_pic_url';
    //     return (
    //         <Message message={message.message} userUid={message.userUID} username={message.user}
    //                  passedUserUid={user.uid} key={message.id} id={message.id} time={message.createdAt}
    //                  profilePic={picture}/>
    //     )
    // })



    async function handleClick(event) {
        event.preventDefault()
        const message = document.getElementById('message').value
        if (message !== null && message !== "") {
            const mesObj = {
                message: message,
                user: us.data().username,
                userID: us.id,
                userUID: user.uid,
                createdAt: Date.now()
            }
            document.getElementById('message').value = null
            await addDoc(messagesCollection, mesObj)
        }
        if (picture !== null) {
            const storageRef = ref(storage, `/files/${picture.name}`)
            const uploadTask = uploadBytesResumable(storageRef, picture);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                async () => {
                    // download url
                    const ur = await getDownloadURL(uploadTask.snapshot.ref)
                    const mesObj = {
                        message: ur,
                        user: us.data().username,
                        userID: us.id,
                        userUID: user.uid,
                        createdAt: Date.now(),
                    }
                    await addDoc(messagesCollection, mesObj)
                }
            );

            await uploadTask
            setPicture(null)

        }

    }

    function handleInputChange() {
        setInput(document.getElementById('message').value)
    }


    // async function singOut() {
    //     await logOut()
    //     navigate("/login")
    // }

    // <button className="logout" onClick={singOut} >Log out</button>
    // <button className="update" onClick={() => navigate("/update")} >Update</button>


    // <div>
    //     <input type="file" accept="image/*"/>
    //     <button>Upload to Firebase</button>
    // </div>

    function toggleDoc(e) {
        e.preventDefault()
        setFilePress(prevState => !prevState)

    }

    // function toggleMenu(e) {
    //     e.preventDefault()
    //     setMenuPress(prevState => !prevState)
    // }


    function handleChange(e) {
        setPicture(e.target.files[0]);
    }

    function selectPicture(e) {
        e.preventDefault()
        document.getElementById("select").click()
    }

    return (

        <>
            < SideBar />
            <Split
                class="wrap"
                sizes={[15, 85]}
                direction="horizontal"
            >
                <div style={{ marginTop:"20px", height: "100vh", width: "15vw",display:"flex",flexDirection:"column", alignItems:"center"  }}>

                </div>
                <div className="chat-holder">
                    <div className="messages-holder">
                        {mesComponents}
                    </div>
                    <div className="qaqaq">
                        {filePress && <div id="image" className={clicked ? "image-light image" : "image-dark image"} onClick={selectPicture}>

                        </div>}
                        {!filePress ? <div id="files" className={clicked ? "files-light files" : "files-dark files"} onClick={toggleDoc}>

                        </div> : <div id="close" className={clicked ? "close-light close" : "close-dark close"} onClick={toggleDoc}>

                        </div>}

                        <form className="typer" onSubmit={handleClick} autoComplete="off">
                            <input className="message-input" onChange={handleInputChange} id="message" type="text"
                                   autoComplete="off"/>
                            <div  className={clicked ? "message-input-button-light input-button" : "message-input-button input-button"} id="submit" onClick={handleClick}></div>
                        </form>
                        {/*{!menuPress ? <div className="settings" onClick={toggleMenu}>*/}

                        {/*</div> : <div id="close" className="close" onClick={toggleMenu}>*/}

                        {/*</div>}*/}
                        {/*{menuPress && <div className="update" onClick={() => navigate("/update")}>*/}

                        {/*</div>}*/}
                        {/*{menuPress && <div className="signOut" onClick={singOut}>*/}

                        {/*</div>}*/}
                        {/*{menuPress &&  <svg className="gpt" onClick={() => navigate("/gpt")} width="35px" height="35px" viewBox="140 140 520 520"><path d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z" fill="#0084FF" ></path></svg>*/}
                        {/*}*/}
                    </div>
                    <div className="hidden">
                        <input id="select" onChange={handleChange} type="file" accept="image/*"/>
                        <button>Upload to Firebase</button>
                    </div>
                </div>
            </Split>
        </>

    )
}




export default Chat;
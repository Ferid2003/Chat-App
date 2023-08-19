import {useAuth} from "../Authentication/AuthContext.jsx";
import {doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {db, messagesCollection} from "../Firebase.js";
import {useEffect, useState} from "react";
import {storage} from "../Firebase.js"
import {ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import Avatar from "@mui/material/Avatar";
import SideBar from "../Chat/test1.jsx";
import Split from "react-split";






function Update(){


    const {us,user} = useAuth()



    const [username,setUsername] = useState(null)
    const [updated,setUpdated] = useState(false)
    const [percents,setPercent] = useState()
    const [pic,setPic] = useState(null)

    const [file, setFile] = useState(null);

    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setPic(objectURL);
        }
    },[file])





     async function checkUpdate(e){
        e.preventDefault()
         const docRef = doc(db, "users", us.id)
         if (file!==null){
             const storageRef =  ref(storage, `/files/${file.name}`)
             const uploadTask = uploadBytesResumable(storageRef, file);
             uploadTask.on(
                 "state_changed",
                 (snapshot) => {
                     const percent = Math.round(
                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                     );

                     // update progress
                     setPercent(percent);
                 },
                 (err) => console.log(err),
                 async () => {
                     // download url
                     const ur = await getDownloadURL(uploadTask.snapshot.ref)
                     await setDoc(
                         docRef,
                         {username: username ? username : us.data().username, profile_pic: file ? ur : us.data().profile_pic},
                         { merge: true }
                     )

                 }
             );
             await uploadTask
             const user_ref = query(messagesCollection, where("userUID", "==", user.uid));
             const uss = (await getDocs(user_ref)).docs
             for (let i=0; i<uss.length; i++){
                 const mes = uss[i]
                 const docRef = doc(db, "messages", mes.id)
                 mes.data().user=1
                 await setDoc(
                     docRef,
                     {user: username},
                     { merge: true }
                 )

             }
             setFile(null)
         }
         else {
             await setDoc(
                 docRef,
                 { username: username ? username : us.data().username},
                 { merge: true }
             )
             const user_ref = query(messagesCollection, where("userUID", "==", user.uid));
             const uss = (await getDocs(user_ref)).docs
             for (let i=0; i<uss.length; i++){
                 const mes = uss[i]
                 const docRef = doc(db, "messages", mes.id)
                 mes.data().user=1
                 await setDoc(
                     docRef,
                     {user: username},
                     { merge: true }
                 )

             }
         }


         document.getElementById("username").value = null
         setUpdated(true)
    }




    return(
        <>
            < SideBar />
            <Split
                class="wrap"
                sizes={[15, 85]}
                direction="horizontal"
            >
                <div style={{ marginTop:"20px", height: "100vh", width: "15vw",display:"flex",flexDirection:"column", alignItems:"center"  }}>

                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",width:"85vw"}}>
                    <h1 className="title">Update Profile</h1>
                    {updated && <h1>Changes are saved!</h1>}
                    <form className="login-form">
                        <input onChange={e => setUsername(e.target.value)} id="username" name="username" type="text" className="username" placeholder="Username"/>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"50px"}}>
                            {pic ? <div className="profile-avatar" style={{backgroundImage: "url(" + pic + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "48px",
                                height: "80px",
                                width: "80px",
                                marginRight: "41px"}}></div> : <Avatar
                                alt="profile_pic"
                                src={pic}
                                sx={{ width: 100, height: 90 }}
                            />}
                            <div className="input-div">
                                <input type="file" onChange={handleChange}  className="file" multiple="multiple" accept="image/*"/>
                                <p>{percents} "% done"</p>
                            </div>
                        </div>
                        <a onClick={checkUpdate}  className="login">Save changes</a>
                    </form>
                </div>
            </Split>
        </>



    )
}


export default Update;
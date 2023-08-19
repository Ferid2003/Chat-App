import "./Message.css"
import {useState} from "react";
import {Link} from "react-router-dom";

function Message(props){

    const [clicked,setClicked] = useState(false)
    const defaultPic = "../images/Ellipse 1.png"

    const style = {
        right: props.userUid===props.passedUserUid ? "0" : "null",
        left: props.userUid===props.passedUserUid ? "null" : "0",
        backgroundColor: props.userUid===props.passedUserUid ? "green": "#3438ef",
        padding: props.userUid===props.passedUserUid ? "15px 15px 15px 5px" : "15px 5px 15px 15px"
    }

    const pic = {
        backgroundImage: props.profilePic==='default_profile_pic_url' ?  "url("+defaultPic+")" : "url("+props.profilePic+")",
        right: props.userUid===props.passedUserUid ? "0" : "null",
        left: props.userUid===props.passedUserUid ? "null" : "0",
    }

    const timeStyle = {
        right: props.userUid===props.passedUserUid ? "0" : "null",
        left: props.userUid===props.passedUserUid ? "null" : "0",
    }

    function handlePicClick(e){
        e.preventDefault()
        setClicked(prevClicked => !prevClicked)
        document.getElementById(props.id).innerText = clicked ? props.username : null;
    }

    const date = new Date(props.time );

    var day = date.getDate()

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var month = months[date.getMonth()];

    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();


    var formattedTime = day + ' ' + month + ' ' + hours + ':' + minutes.substr(-2)



    const picStyle = {
        width: "300px",
        height: "300px",
        backgroundImage: "url("+ props.message +")",
        backgroundSize: "cover",
        backgroundColor: "transparent"
    }

    const styleParent = {
        height: props.message.startsWith("https://firebasestorage.googleapis.com") ? "400px": "60px",
    }

    function linkify(text) {
        if (text.includes(".com" || ".ru" || ".de" || ".az")){
            if (text.startsWith("https://" || "http://")){
                return (<div style={{color:"white"}}>
                    <a target="_blank" href={text} rel="noreferrer">{text}</a>
                </div>)
            }else {
                return (<div style={{color:"white"}}>
                    <a target="_blank" href={`https://${text}`} rel="noreferrer">{text}</a>
                </div>)
            }
        } else {
            return (<div style={{color:"white"}}>
                {text}
            </div>)
        }
    }


    return (
        <>
            <div style={styleParent} id="parent" className="parent">
                <div className="mes-info">
                    <div onClick={handlePicClick} id={props.id} style={pic} className="profile-picture">

                    </div>
                    <div style={style} className="message">
                        {props.userUid===props.passedUserUid ? <div className="time-holder">
                            <div style={timeStyle} className="time">
                                {formattedTime}
                            </div>
                        </div> : props.message.startsWith("https://firebasestorage.googleapis.com") ? <div style={picStyle}></div> : linkify(props.message)}
                        {props.userUid!==props.passedUserUid ? <div className="time-holder">
                            <div style={timeStyle} className="time">
                                {formattedTime}
                            </div>
                        </div> : props.message.startsWith("https://firebasestorage.googleapis.com") ? <div style={picStyle}></div> : linkify(props.message)}
                    </div>

                </div>
            </div>
        </>

    )
}

export default Message;
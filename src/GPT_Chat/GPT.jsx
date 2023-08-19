import "./GPT.css"
import {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ConversationHeader, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Avatar } from '@chatscope/chat-ui-kit-react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Authentication/AuthContext.jsx";
import Test1 from "../Chat/test1.jsx";
import SideBar from "../Chat/test1.jsx";
import Split from "react-split";

const API_KEY = "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";
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function GPT(){

    const {logOut,us} = useAuth()
    const navigate = useNavigate()

    const userPic = us.data().profile_pic

    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);


    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };


        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message}
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act.
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        });
    }

    async function singOut() {
        await logOut()
        navigate("/login")
    }


    return (
        <>
            <SideBar />
            <Split
                class="wrap"
                sizes={[15, 85]}
                direction="horizontal"
            >
                <div style={{ marginTop:"20px", height: "100vh", width: "15vw",display:"flex",flexDirection:"column", alignItems:"center"  }}>

                </div>
                <div className="gpt-holder">
                    <div style={{ position:"relative", height: "100vh", width: "85vw"  }}>
                        <MainContainer>
                            <ChatContainer>
                                <ConversationHeader>
                                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" name="ChatGPT" />
                                    <ConversationHeader.Content userName="Chat GPT" />
                                </ConversationHeader>
                                <MessageList
                                    scrollBehavior="smooth"
                                    typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                                >
                                    {messages.map((message, i) => {
                                        return (<Message key={i} model={message} >
                                            {message.sender==="ChatGPT" ? <Avatar src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" name="ChatGPT" />: <Avatar src={userPic} name={us.data().username} />}
                                        </Message>)
                                    })}
                                </MessageList>
                                <MessageInput placeholder="Type message here" onSend={handleSend}  attachButton={false} />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                </div>
            </Split>
        </>
    )
}

export default GPT;
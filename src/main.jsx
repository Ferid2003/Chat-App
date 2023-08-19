import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,Navigate
} from "react-router-dom";
import Login from "./Login/Login.jsx";
import Chat from "./Chat/Chat.jsx";

import Register2 from "./Register/Register2.jsx";
import Register3 from "./Register/Register3.jsx";
import {AuthProvider} from "./Authentication/AuthContext.jsx";
import PrivateRoute2 from "./PrivateRoute/PrivateRoute2.jsx";
import Update from "./Update/Update.jsx";
import GPT from "./GPT_Chat/GPT.jsx";
import ResetPassword from "./Reset_Password/Reset_Password.jsx";






const router = createBrowserRouter(    [
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/chat",
        element: <PrivateRoute2> <Chat /> </PrivateRoute2>,
    },
    {
        path:"/register",
        element: <Register2 />,
    },
    {
        path:"/update",
        element: <PrivateRoute2> <Update /> </PrivateRoute2>
    },
    {
        path:"/name",
        element: <PrivateRoute2> <Register3 /> </PrivateRoute2>,
    },
    {
        path:"/gpt",
        element: <PrivateRoute2> <GPT /> </PrivateRoute2>,
    },
    {
        path:"//reset-password",
        element: <ResetPassword />,
    },
    {
        index:true,
        element: <Navigate to="/login"/>
    }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
)

import {useAuth} from "../Authentication/AuthContext.jsx";
import {Navigate} from "react-router-dom";

function PrivateRoute({children}){
    const {user} = useAuth()

    return user ? <Navigate to="/chat"/> : children

}
export default PrivateRoute;
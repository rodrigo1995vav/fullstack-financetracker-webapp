import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Redirect = ({ children }) => {

    const { auth } = useAuth();
    console.log(auth)

    return (
        auth.accessToken ? (
            children 
        ) : (
            <Navigate to="/" />
        )
    );
}

export default Redirect;
import axios from "axios";
import useAuth from "./useAuth";

axios.defaults.withCredentials = true

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios.delete('http://localhost:3000/api/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
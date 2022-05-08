
import { refreshToken } from "../services/apiServices";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
   const response =  await refreshToken()
    console.log(response)
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.accessToken)
      return{...prev,accessToken: response.data.accessToken}
    })
    return response.data.accessToken
  };

  return refresh;
};

export default useRefreshToken;

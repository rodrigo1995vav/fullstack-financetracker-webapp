import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../services/apiServices';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie"
import './Auth.css'




const Login = () => {
    const { auth, setAuth } = useAuth();


    const navigate = useNavigate()
    const location = useLocation()


    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const str = email.toLowerCase();
        // Replacing " " (space) to "" empty space
        const emailOk = str.replace(/ /g, '')
        

        try {
            const response = await loginUser(
                {
                    "email":emailOk,
                    "password":pwd
                }
            )
            ;
            console.log(response);
            
            //refreshToken should be saved as httpOnly for security, not able to do that due to domain between server and client not equal
            Cookies.set('jwt', response.data.refreshToken)
            
            const accessToken = response?.data?.accessToken;
            console.log(response.data.accessToken)
            setAuth( {accessToken} )
            console.log(auth)
            
            setEmail('');
            setPwd('');
            navigate('/user/myaccount')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 404) {
                setErrMsg('User does not exists ');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='header-auth'>Sign In</h1>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <label htmlFor="email">User email:</label>
                        <input
                            className='text'
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            className='pwd'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        
                        <button className="logout">Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link style={{ color: 'black' }} to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
           )
}

export default Login
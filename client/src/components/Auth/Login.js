import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../services/apiServices';
import { Link, useNavigate, useLocation } from 'react-router-dom';




const Login = () => {
    const { setAuth } = useAuth();


    const navigate = useNavigate()
    const location = useLocation()
    //const from = location.state?.from?.pathname || "/"


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
        console.log(emailOk); 

        try {
            const response = await loginUser(
                {
                    "email":emailOk,
                    "password":pwd
                }
            )
            ;
            console.log(response.data.data.user.role)
            console.log(response.data.data.user.name)
            console.log(response.data.data.token)
            const accessToken = response?.data?.data?.token;
            //const roles = response?.data?.data.user.role;
            const roles = ["user"]
            const user = response.data.data.user.name
            setAuth({ user, emailOk, roles, accessToken });
            setEmail('');
            setPwd('');
            navigate('/folderlist')
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
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">User email:</label>
                        <input
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
                            {/*put router link here*/}
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
           )
}

export default Login
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import Loader from '../components/Loader';
import { login } from '../redux/actions/userActions';
import { toast } from 'react-toastify';

const LoginScreen = () => {

    const userLogin = useAppSelector(state => state.user);
    const { request: { loading: isLoading }, userInfo } = userLogin; 
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const search = useLocation();
    const sp = new URLSearchParams(search); 
    // a built-in JavaScript object that allows you to work with the query string of a URL. 
    // It provides methods for appending, deleting, getting, and setting key-value pairs in the query string. 
    // You can use it to easily modify and manipulate the URL in your web applications.
    const redirect = sp.get('redirect') || '/';

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(login({ email, password }));
            setEmail('');
            setPassword('');
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Email:</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isLoading}>Login</button>
                { isLoading  && <Loader /> }
            </form>
        </div>
    )
}

export default LoginScreen
// form capture email and password sends the info to the server to validate creds and authenticate
// onChange useState: email and password
// onSubmit pass formData to dispatch method to login User and send data to server
// save credentials in local storage using dispatch method setCredentials


import './Login.css'
import RegisterPopUp from '../components/RegisterPopUp';
import LoadingButton from '../components/LoadingButton';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'


const Login = () => {

    const { login, isLogged } = useUser()
    const navigate = useNavigate()

    //if user is logged in redirect to home with useEffect hook because it is a side effect of the component mounting
    //and is not part of the component rendering
    useEffect(() => {
        if (isLogged) {
            navigate('/home/feed')
        }
    }, [isLogged, navigate])

    //states and hooks for login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    //states and hooks for register
    const [show, setShow] = useState(false);

    //waiting response from API register call
    const [loading, setLoading] = useState(false);

    //handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Please fill all the fields')
            return
        }
        try {
            //set loading to true
            setLoading(true)
            //gettin url from .env file
            const url = import.meta.env.VITE_API_URL
            await axios.post(url + '/login', { email, password }).then((res) => {
                //set loading to false
                setLoading(false)
                setMessage(res.data.message)
                if (res.status === 200) {
                    setEmail('')
                    setPassword('')
                    setMessage('user logged in')
                    //set user state
                    login(res.data)
                    navigate("/home/feed")
                }
            })
        }
        catch (err) {
            setLoading(false);
            if (err.response) {
                console.log(err.response.data)
                setMessage(err.response.data.message)
            } else {
                setMessage('something went wrong with the server')
            }
        }
    }

    return (
        <div className="flex md:flex-row md:justify-between justify-center items-center h-screen px-8 flex-col">
            <div className='md:w-1/2'>
                <h1 className='text-9xl text-amber-400 font-bold text-center'>Cookio</h1>
                <h2 className='text-2xl text-white font-bold text-center mt-4'>Discover, share and prepare delicious recipes on your own way</h2>
            </div>
            <div className='md:w-1/2 md:mt-0 mt-16'>
                <div className="form-login p-8 rounded shadow-md w-96 mx-auto">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-white font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <LoadingButton
                                text='Login'
                                onClick={handleLogin}
                                loading={loading}
                                disabled={loading}
                                style='bg-amber-400 w-60 hover:bg-white text-black font-bold py-2 px-4 rounded-3xl border-2 border-amber-400 hover:border-2 focus:outline-none focus:shadow-outline'
                                type='submit' />
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <p className="block text-white font-bold text-center">{message}</p>
                        </div>
                    </form>
                    <hr className=' w-auto  bg-white m-6'></hr>
                    <p className="block text-white font-bold text-center">A new world of cooking made by you</p>
                    <div className="flex items-center justify-center mt-2">
                        <button
                            className=" bg-white w-60 hover:bg-white text-black font-bold py-2 px-4 rounded-3xl border-2 border-white hover:border-2 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => setShow(true)}
                        >
                            Register
                        </button>
                        {show && <RegisterPopUp show={show} setShow={setShow} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

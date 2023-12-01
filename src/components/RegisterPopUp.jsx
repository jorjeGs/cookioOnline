import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";
import LoadingButton from "./LoadingButton";

const RegisterPopUp = ({ show, setShow }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    //waiting response from API register call
    const [loading, setLoading] = useState(false);

    if (show) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    //handle register
    const handleRegister = async () => {
        event.preventDefault();
        if (!name || !email || !password || !username) {
            alert("Please fill all the fields");
            return;
        }
        try {
            //set loading to true
            setLoading(true);
            //fix axios response
            const url = import.meta.env.VITE_API_URL
            await axios.post(url + '/register', {username, name, email, password}).then((res) => {
                setLoading(false);
                setShow(false);
                console.log(res);
                console.log(res.status);
                if (res.status === 200) {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    alert("user registered");
                } else if (res.data.status === 400) {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    alert("invalid credentials" + res.data.error);
                } else {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    alert("something went wrong");
                }
            });
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

    };

    return (
        <>
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content w-1/4">
                        <form onSubmit={handleRegister}>
                            <div className="flex justify-center items-center mt-16 mb-16">
                                <h1 className=" text-6xl text-amber-950 font-bold">Join us!</h1>
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-black font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center items-center mb-6">
                                <LoadingButton style="bg-amber-400 w-60 hover:bg-white text-black font-bold py-2 px-4 rounded-3xl border-2 border-amber-400 hover:border-2 focus:outline-none focus:shadow-outline mt-8" text="Register" onClick={handleRegister} loading={loading} disabled={loading} />
                            </div>
                            <button
                                className="close-modal text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => setShow(false)}
                            >
                                X
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPopUp;

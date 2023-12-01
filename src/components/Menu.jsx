import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaUser, FaBars } from "react-icons/fa";
import { GrPowerShutdown } from "react-icons/gr";
import { BiSolidBookHeart } from "react-icons/bi";


function onToggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('top-[14%]');
}

 const Menu = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        //eliminate token from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        logout();
        navigate('/login');
    }; 

    return (
        <nav className='flex justify-between items-center w-[92%] mx-auto h-20 '>
            <div className='logo justify-center'>
                <Link to='/home/feed'>                 
                        <h1 className='text-yellow-500 text-5xl'><strong><i>Cookio</i></strong></h1>
                </Link>    
            </div>
            <div className='menu nav-links duration-500 md:hidden md:static absolute md:min-h-fit min-h-[40vh] left-0 top-[-100%] md:w-auto md:opacity-100 opacity-100 w-full flex items-center'>
                <ul className='flex md:flex-row flex-col mx-auto md:items-center md:gap-[8vw] gap-8'>
                    <li>
                        <Link to='/home/recipes'>
                            <BiSolidBookHeart className='w-16 h-auto text-yellow-500' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/create'>
                            <FaPlus className='w-16 h-auto text-yellow-500' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/profile'>
                            <FaUser className='w-16 h-auto text-yellow-500' />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='user flex items-center gap-6'>
                <button onClick={handleLogout} >
                    <GrPowerShutdown className='w-16 h-auto text-white border-black hover:text-yellow-500' />
                </button>
                <button onClick={onToggleMenu} className='md:hidden block'>
                    <FaBars className='w-16 h-auto text-white border-black hover:text-yellow-500' />
                </button>
            </div>
        </nav>
    );
};

export default Menu;
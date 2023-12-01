import { Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { BiSolidBookHeart } from "react-icons/bi";
import { FaUser, FaPlus } from "react-icons/fa";
import UserCard from "../components/UserCard";
import FormRecipeComponent from "../components/FormRecipeComponent";


const CreateRecipe = () => {
    const { user } = useUser();
    const url = import.meta.env.VITE_API_URL
    return (
        <>
            <div className='flex w-full mt-5 h-full'>
                <div className='feed-buttons-container xl:w-1/3 xl:flex xl:flex-col xl:h-fit xl:justify-center xl:gap-5 hidden'>
                    <UserCard name={user.username} imgSrc={url + '/users/images/' + user.profile_pic} likes={user.likes} />
                </div>
                <div className="recipes-container sm:w-1/2 xl:w-1/3 sm:flex sm:flex-col gap-7 w-full no-scrollbar">
                    <FormRecipeComponent />
                </div>
                <div className='feed-buttons-container sm:w-1/2 xl:w-1/3 sm:flex sm:flex-col sm:h-fit gap-5 hidden'>
                    <Link to='/home/recipes'>
                        <button className='feed-button flex flex-row w-3/4 mx-auto p-2 items-center justify-center rounded-2xl'><BiSolidBookHeart className='misRecetasIcon w-20 h-auto ml-8 text-yellow-500' /><h1 className=' text-white w-2/3 text-4xl mx-3'><strong><i>Mis Recetas</i></strong></h1></button>
                    </Link>
                    <Link to='/home/create'>
                        <button className='feed-button flex flex-row w-3/4 mx-auto p-2 items-center justify-center rounded-2xl'><FaPlus className='busquedaIcon w-20 h-auto  ml-8 text-yellow-500' /><h1 className=' text-white text-4xl w-2/3 mx-3'><strong><i>Crear</i></strong></h1></button>
                    </Link>
                    <Link to='/home/profile'>
                        <button className='feed-button flex flex-row w-3/4 mx-auto p-2 items-center justify-center rounded-2xl'><FaUser className='usuarioIcon w-20 h-auto  ml-8 text-yellow-500' /><h1 className=' text-white text-4xl w-2/3 mx-3'><strong><i>Cuenta</i></strong></h1></button>
                    </Link>
                </div>
            </div>
            <Outlet />
        </>

    );
}

export default CreateRecipe;
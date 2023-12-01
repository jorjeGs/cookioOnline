import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserRecipes } from '../services/recipeService';
import useUser from '../hooks/useUser';
import RecipeComponent from '../components/RecipeComponent';
import './Feed.css';
import { BiSolidBookHeart } from "react-icons/bi";
import { FaPlus, FaUser } from "react-icons/fa";
import UserCard from '../components/UserCard';


const MyRecipes = () => {
    //by userprovider to get liked recipes,
    const { user, getUserLikes, userLikes } = useUser();

    const [recipes, setRecipes] = useState(null);
    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        //also get user likes from function service getUserLikes
        const setUserLikes = async () => {
            await getUserLikes(user);
        };

        //get liked from function service getUserRecipes
        const setUserRecipes = async () => {
            await getUserRecipes(user.id).then((response) => {
                setRecipes(response);
            })
        };
        setUserRecipes();
        setUserLikes();
    }, [setRecipes]);


    return (
        <>
            <div className='flex w-full mt-5 h-full'>
                <div className='feed-buttons-container xl:w-1/3 xl:flex xl:flex-col xl:h-fit xl:justify-center xl:gap-5 hidden'>
                    <UserCard name={user.username} imgSrc={url + '/users/images/' + user.profile_pic} likes={user.likes} />
                </div>
                <div className="recipes-container sm:w-1/2 xl:w-1/3 sm:flex sm:flex-col gap-7 w-full no-scrollbar">
                    {
                        //if recipes is null show loading
                        recipes === null ? <p className='text-white'>Loading...</p> :
                            recipes.map((recipe, index) => {
                                return (
                                    <RecipeComponent
                                        key={index}
                                        recipeId={recipe.id}
                                        title={recipe.title}
                                        description={recipe.description}
                                        imgSrc={`${url}/recipes/images/${recipe.image}`}
                                        initialLikes={recipe.likes}
                                        created_by={recipe.created_by}
                                    />
                                );
                            })
                    }
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

export default MyRecipes;
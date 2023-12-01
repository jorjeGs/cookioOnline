import './RecipeComponent.css';
import { useState, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import useUser from '../hooks/useUser';


const RecipeComponent = ({ recipeId, imgSrc , title, description, initialLikes, created_by }) => {
    //state to check if the recipe is liked or not
    const [liked, setLiked] = useState(false);
    //state to save the number of likes
    const [likes, setLikes] = useState(initialLikes);

    //get the user id from the user provider
    const { user, addLike, disLike, userLikes } = useUser();

    //check in useEffect if the recipe is in the userLikes array
    //if it is, set the initialIsLiked state to true
    //else set it to false
    useEffect(() => {
        //check if the userlikes array is not empty
        //if it is not empty, check if the recipeId is in the array
        //if it is, set the initialIsLiked state to true
        //else set it to false
        if (userLikes.length > 0) {
            const isLiked = userLikes.some(like => like === recipeId);
            if (isLiked) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        } else {
            setLiked(false);
        }
    }, [userLikes, recipeId]);

    //function to handle the like button
    const handleLike = () => {
        //if the recipe is liked we call the unlikeRecipe function
        //else we call the likeRecipe function
        if (liked) {
            disLike({recipeId});
            setLikes(likes - 1);
        } else {
            addLike({recipeId});
            setLikes(likes + 1);
        }
    };

    //text for the like button if it is liked or not
    const likeStyle = liked ? 'text-yellow-500' : 'text-white hover:text-yellow-500';

    //on click we change the state of the liked button
    return (
        <div className="recipe-card w-3/4 max-h-fit rounded-2xl mx-auto">
            <div className='recipe-card-image-container flex-row w-full h-auto justify-center items-center overflow-hidden rounded-2xl'>
                <img src={imgSrc} alt={title} className='recipe-card-img' />
            </div>
            <div className='flex flex-row justify-center items-center w-full mt-3'>
            <h2 className='recipe-title w-2/3 ml-8 text-yellow-500 text-4xl'><strong>{title}</strong></h2>
            <p className='text-white w-1/3 text-xl'><strong>By: {created_by}</strong></p>
            </div>
            <p className='recipe-description flex flex-row ml-8 mt-3 text-white items-center text-xl'>{description}</p>
            <div className="button-container flex flex-row mt-3 justify-between w-full items-center mb-3 text-3xl">
                <div className='w-full flex justify-center items-center gap-3'>
                    <button className="Like-button" onClick={handleLike} ><FaHeart className={likeStyle} /></button>
                    <p className='text-white text-2xl'><strong>{likes}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default RecipeComponent;

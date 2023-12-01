import Context from "../context/UserContext";
import { useCallback, useContext } from "react";
import { likeRecipe, unlikeRecipe, getLikes } from '../services/likeService';
import { getUserInfo } from "../services/userService";

export default function useUser() {
    const { user, setUser, token, setToken, userLikes, setUserLikes, userRecipes, setUserRecipes } = useContext(Context);
    //add token validation logic here

    const login = useCallback((user) => {
        //login logic
        const token = user.token;
        const data = user.data;

        //set token and user data in local storage (hybrid storage)
        //we save the user data as a string because local storage only stores strings
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('token', JSON.stringify(token))
        setUser(data);
        setToken(token);
    }, [setUser, setToken]);

    const logout = useCallback(() => {
        //logout logic
        setUser(null);
        setToken(null);
    }, [setUser, setToken]);

    //function to add like to recipes
    const addLike = useCallback(({ recipeId }) => {
        //first call to service
        likeRecipe(recipeId, user.id)
            .then(userLikes => {
                setUserLikes(prevUserLikes => [...prevUserLikes, recipeId]);
            }
            )
            .catch(err => {
                console.log(err)
            })
    }, [setUserLikes, user]);

    //function to dislike recipes
    const disLike = useCallback(({ recipeId }) => {
        //first call to service
        unlikeRecipe(recipeId, user.id).then(() => {
            // Eliminar el recipeId de userLikes después de quitar el "me gusta"
            setUserLikes((prevUserLikes) => {
                const updatedLikes = prevUserLikes.filter((id) => id !== recipeId);
                return updatedLikes;
            });
        })
            .catch((error) => {
                // Manejar errores, si es necesario
            });
    }, [user, setUserLikes]);

    //function to initialize userLikes
    const getUserLikes = useCallback((user) => {
        //call to function service getLikes, also, this endpoint has to be created to only return recipeId of tr table
        //CHECKPOINT FIX RESPONSE USE USER LIKES
        //ALSO CHANGE IN SERVICES URL
        const response =  getLikes(user.id).then((response) => {
            setUserLikes(response);
        })
        .catch((error) => {
            // Manejar errores, si es necesario
            console.log(error)
        }
        )
    }, [user, setUserLikes]);

    //function to update user info
    const getUserData = useCallback((user) => {
        //call to function service getUserInfo to update user info
        const response = getUserInfo(user.id).then((response) => {
            setUser(response);
        })
        .catch((error) => {
            // Manejar errores, si es necesario
            console.log(error)
        }
        )
    }, [user, setUser]);

    return {
        isLogged: Boolean(token),
        login,
        logout,
        addLike,
        disLike,
        getUserLikes,
        getUserData,
        userLikes,
        user
    };
}
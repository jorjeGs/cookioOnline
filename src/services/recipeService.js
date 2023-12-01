import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getUserRecipes = async (userId) => {
    //call to the api to get recipes liked by the user
    try {
        const response = await axios.get(url + '/users/' + userId + '/liked');
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
    }
}

export const getAllRecipes = async () => {
    //call to the api to get all recipes using axios and dotenv
    try {
        const response = await axios.get(url + '/recipes');
        return response.data;
    }
    catch(error) {
        console.log(error);
    }
}

export const createRecipe = async (recipe) => {
    //call to the api to create a new recipe
    try {
        // we will get a form data object from the create recipe page so
        //we need to also add the headers to the request
        const response = await axios.post(url + '/recipes', recipe, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    catch(error) {
        alert("Error creating recipe");
        console.log(error);
    }
}
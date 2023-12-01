import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getUserInfo = async (userId) => {
    const response = await axios.get(`${url}/users/${userId}`);
    return response.data;
}

export const updateUser = async (userId, user) => {
    //we are sending images as multipart/form-data
    //so, we need to add a header to the request
    try {
        const response = await axios.patch(`${url}/users/${userId}`, user, {
            headers: {
                "Content-Type": "multipart/form-data"
            } 
        });
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        alert("Error updating user");
        console.log(error);
    }
}
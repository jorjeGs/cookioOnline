import React, {useState} from "react";

const Context = React.createContext({});

export function UserContextProvider({children}) {
    //state and hook for user
    //initialize must come from local storage or from a cookie or from a session storage
    //state is being initialized with an arrow function because it is a side effect of the component mounting
    //and is not part of the component rendering, this way we avoid the state to be initialized every time the component renders
    const [user, setUser] = useState(() => {
        //we parse the string to JSON because local storage only stores strings
        //and we need to parse it to JSON to be able to use it as an object
        return JSON.parse(localStorage.getItem('user')) || null
    });

    //also, we can add an state for the token and initialize it with the same logic as the user state
    const [token, setToken] = useState(() => {
        return JSON.parse(localStorage.getItem('token')) || null
    });

    //we can also add an state for the user likes
    //some people initialize the state with useEffect, but it is not recommended because it is a side effect
    //and it is not part of the component rendering and it can cause problems with the component lifecycle
    const [userLikes, setUserLikes] = useState([]);

    //state for user recipes
    const [userRecipes, setUserRecipes] = useState([]);

    //then, send it to the provider
    return <Context.Provider value={{user, setUser, token, setToken, userLikes, setUserLikes, userRecipes, setUserRecipes }}>
        {children}
    </Context.Provider>
}

export default Context;
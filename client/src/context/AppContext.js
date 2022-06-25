import {createContext, useState} from "react";


export const AppContext = createContext();

const AppContextProvider=({children})=>{
    
    const getUserFromLS = ()=>{
        let user = localStorage.getItem('user')
        if (user){
            return JSON.parse(user)
        }
    }

    const [user, _setUser] = useState(getUserFromLS()??{})
    const [alert, setAlert] = useState({})
    const [home, setHome] =useState(false);
    const [popular, setPopular] =useState(false);
    const [genre, setGenre] =useState(false);
    const [watch, setWatch] =useState(false);
    const [recommend, setRecommend] =useState(false);
    const [search, setSearch] =useState(false);
    const [admin, setAdmin] =useState(false);
    const [login, setLogin] =useState(false);
    const [signUp, setSignUp] =useState(false);
    const [recUser, setRecUser] =useState(getUserFromLS()?.id??{});


    const setUser = (user)=>{
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
    }

    const values = {
        alert,
        user,
        setAlert,
        setUser,
        home,
        setHome,
        popular,
        setPopular,
        genre,
        setGenre,
        watch,
        setWatch,
        recommend,
        setRecommend,
        search,
        setSearch,
        admin,
        setAdmin,
        recUser,
        setRecUser,
        login,
        setLogin,
        signUp,
        setSignUp
        
        
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
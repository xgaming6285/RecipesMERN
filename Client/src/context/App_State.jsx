import { useEffect, useState, useCallback } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";
import PropTypes from 'prop-types';

const App_State = (props) => {
  const url = "http://localhost:3000/api";
  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState("")
  const [userRecipe, setuserRecipe] = useState([])
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [reload, setreload] = useState(true)

  // getSaved recipe
  const getSavedRecipeById = useCallback(async () => {
    const api = await axios.get(
      `${url}/recipes/saved`,
      {
        headers: {
          "Content-Type": "application/json",
          "Auth": token
        },
        withCredentials: true,
      }
    );
    console.log("getting saved recipe ", api.data.recipes);
    setsavedRecipe(api.data.recipes);
    // return api;
  }, [url, token]);

  // profile
  const profile = useCallback(async () =>{
    const api = await axios.get(`${url}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token
      },
      withCredentials: true,
    });
    // console.log("This is user profile ",api.data.user)
    setuserId(api.data.user._id)
    setuser(api.data.user)
  }, [url, token]);

  // get recipe by userId
  const recipeByUser = useCallback(async (id) =>{
    const api = await axios.get(`${url}/recipes/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    });
    // console.log("user Specific recipe ",api)
    setuserRecipe(api.data.recipes)
  }, [url]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/recipes`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.recipes);
      setrecipe(api.data.recipes);
    };
    fetchRecipe();
    
    if (token) {
      getSavedRecipeById();
      profile();
      if (userId) {
        recipeByUser(userId);
      }
    }
    
  }, [token, userId, reload, getSavedRecipeById, profile, recipeByUser]);

  useEffect(() => {
  if(token){
    localStorage.setItem("token",token)
  }
  const tokenFromLocalStorage = localStorage.getItem("token",token)
  if(tokenFromLocalStorage)
  {
    setToken(tokenFromLocalStorage);
    setisAuthenticated(true)
  }
  }, [token,reload])
  

  // register
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/users/register`,
      { name, gmail, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return api;
  };

  // login
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/users/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    setisAuthenticated(true)
    return api;
    // console.log("login data ",api)
  };

  // addRecipe
  const addRecipe = async (
    title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl
  ) => {
    const api = await axios.post(
      `${url}/recipes`,
      {
        title,
        ist,
        ing1,
        ing2,
        ing3,
        ing4,
        qty1,
        qty2,
        qty3,
        qty4,
        imgurl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setreload(!reload)
    return api;
  };

  // recipeById
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/recipes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(api);
    return api;
  };

  // save Recipe By Id
  const savedRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/recipes/save/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log(api);
    setreload(!reload);
    return api;
  };

  // update Recipe By Id
  const updateRecipe = async (
    id,
    title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl
  ) => {
    try {
      const api = await axios.put(
        `${url}/recipes/${id}`,
        {
          title,
          ist,
          ing1,
          ing2,
          ing3,
          ing4,
          qty1,
          qty2,
          qty3,
          qty4,
          imgurl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth": localStorage.getItem("token") || token,
          },
          withCredentials: true,
        }
      );
      setreload(!reload);
      return api;
    } catch (error) {
      console.error("Update recipe error:", error.response || error);
      throw error;
    }
  };

  const logOut = () =>{
    localStorage.removeItem("token",token)
    setToken("")
    setisAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        recipe,
        getRecipeById,
        savedRecipeById,
        savedRecipe,
        userRecipe,
        user,
        logOut,
        isAuthenticated,
        setisAuthenticated,
        updateRecipe
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

App_State.propTypes = {
  children: PropTypes.node.isRequired
};

export default App_State;

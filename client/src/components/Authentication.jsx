import axios from "axios";


const API_URL = "/auth";

const register = (uname, email, age,gender, password ) =>{
    return axios.post(API_URL + "/register", {
        uname,
        email,
        age,
        gender,
        password
    }).then((response) =>{
        if (response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const login = (email, password) => {
    return axios.post(API_URL + "/login", {
        email,
        password
    }).then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));

        }
        return response.data;
    });

};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const Authentication = {
    register,
    login,
    logout,
    getCurrentUser
}


export default Authentication;
import axios from 'axios';

export default function setAuthorizationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        // axios.defaults.headers.common = {};
        // axios.defaults.headers.common.accept = 'application/json';
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
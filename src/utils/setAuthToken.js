import axios from 'axios';

const setAuthoToken = (token) => {
    if(token) {
        // Apply to every request
        // axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['X-Auth'] = token;
    }
    else {
        // Delete auth header
        // delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['X-Auth'];
    }
}

export default setAuthoToken;
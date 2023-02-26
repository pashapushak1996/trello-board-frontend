import axios from 'axios';

const BASE_URL = 'https://trello-api-3avt.onrender.com';

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;

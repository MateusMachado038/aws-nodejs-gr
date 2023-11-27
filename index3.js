
const axios = require('axios');

const getResponseAPI = axios.create({
    baseURL: 'https://api.getresponse.com/v3',
    headers: {
        'X-Auth-Token': 'api-key s6vypubqyysb4av2fah2uu9tkg66dxh0',
        'Content-Type': 'application/json'
    }
});

getResponseAPI.get('/contacts')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Erro ao acessar a API do GetResponse:', error);
    });
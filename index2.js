require('dotenv').config();
var axios = require("axios");
const express = require('express');
const app = express();

const token = process.env.GETRESPONSE_TOKEN;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/script', (req, res) => {
    const id = req.query.id;
    const email = req.query.email;

    if (!id || !email) {
        return res.status(400).send('Parâmetros inválidos.');
    }

    const getResponseAPI = axios.create({
        baseURL: 'https://api.getresponse.com/v3',
        headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json'
        }
    });

    getResponseAPI.get(`/contacts?query[email]=${email}`)
        .then(response => {
            const contact = response.data.find(contact => contact.email === email);

            // Verifica se o contato foi encontrado pelo email e se o ID corresponde
            if (contact && contact.contactId === id) {
              return res.send('Boaa!');
              //  res.redirect('/update');
            } else {
                res.status(403).send('Not authorised to perform action. Please contact relevant person');
            }
        })
        .catch(error => {
            // Erro ao acessar a API do GetResponse
            res.status(500).send('Erro ao acessar a API do GetResponse');
        });
});


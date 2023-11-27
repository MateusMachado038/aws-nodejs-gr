require('dotenv').config();
const express = require('express');
var axios = require("axios");
const app = express();

const token = process.env.GETRESPONSE_TOKEN;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


app.get('/script', (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    const token = process.env.GETRESPONSE_TOKEN;


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
  
  getResponseAPI.get(`/contacts/${id}`)
      .then(response => {
        var verficaEmail = response.data.email;

        if(verficaEmail == email ){
          return res.send('igual');
        }
        else{
          return res.send('diferente');
        }
      })
      .catch(error => {
          return res.send('Erro');
      });
});





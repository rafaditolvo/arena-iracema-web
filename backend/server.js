const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());


app.post('/formulario', (req, res) => {
  const { phone, email, firstname,  dob } = req.body;

  const newData = { phone, email, firstname,  dob };

  fs.readFile('dados.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler o arquivo.' });
    }
  
    if (!data) {
      // O arquivo está vazio
      return res.status(500).json({ error: 'O arquivo está vazio.' });
    }
  
    try {
      const jsonData = JSON.parse(data);
      if (!Array.isArray(jsonData)) {
        // O conteúdo do arquivo não é um array
        return res.status(500).json({ error: 'O conteúdo do arquivo não é um array.' });
      }

      jsonData.push(newData);

      fs.writeFile('dados.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao escrever no arquivo.' });
        }

        return res.status(200).json({ message: 'Dados armazenados com sucesso.' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao analisar o JSON.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

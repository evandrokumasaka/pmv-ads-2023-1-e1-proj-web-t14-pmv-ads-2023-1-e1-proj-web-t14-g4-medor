const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// app.use(express.static('public'));
app.use(express.static(path.join('./src', 'public')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

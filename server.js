const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'aaron',
  database: 'comentarios_bdd',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Nuevo endpoint para insertar comentarios
app.post('/api/comentarios', (req, res) => {
    const { contenido } = req.body;
  
    if (!contenido) {
      return res.status(400).json({ error: 'El contenido del comentario es obligatorio' });
    }
  
    const sql = 'INSERT INTO comentarios (contenido) VALUES (?)';
    connection.query(sql, [contenido], (err, result) => {
      if (err) {
        console.error('Error al insertar comentario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      console.log('Comentario agregado con éxito');
      res.json({ success: true });
    });
  });
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });

// Endpoint para obtener la lista de comentarios
app.get('/api/comentarios', (req, res) => {
    const sql = 'SELECT id, contenido FROM comentarios';
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener la lista de comentarios:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json(result);
    });
  });
  
// Agrega este bloque al final de tu archivo server.js
app.delete('/api/comentarios', (req, res) => {
    const { ids } = req.body;
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs válidos' });
    }
  
    const sql = 'DELETE FROM comentarios WHERE id IN (?)';
    connection.query(sql, [ids], (err, result) => {
      if (err) {
        console.error('Error al eliminar comentarios:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      console.log('Comentarios eliminados con éxito');
      res.json({ success: true });
    });
  });
  
  
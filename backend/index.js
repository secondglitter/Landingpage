const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, telefono, correo, mensaje } = req.body;
    console.log("Datos recibidos:", req.body);

    const sql = `
      INSERT INTO contactos (nombre, telefono, correo, mensaje)
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(sql, [nombre, telefono, correo, mensaje]);

    res.status(200).json({ mensaje: 'Formulario guardado con éxito' });
  } catch (error) {
    console.error('Error en backend:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
});

const express = require('express');
const cors = require('cors');
const pool = require('./db');

// Solución para fetch en CommonJS
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET_KEY = '6LdWaWsrAAAAAOYBLL9HgF2xqcol78i2bnKUFcKi';

app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, telefono, correo, mensaje, captcha } = req.body;

    if (!captcha) {
      return res.status(400).json({ error: 'Captcha no proporcionado' });
    }

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;

    const captchaResponse = await fetch(verificationURL, { method: 'POST' });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ error: 'Falló la validación del captcha' });
    }

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

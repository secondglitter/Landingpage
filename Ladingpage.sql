CREATE DATABASE landingpage;

use landingpage;

CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  telefono VARCHAR(20),
  correo VARCHAR(100),
  mensaje TEXT,
  Terminos BOOLEAN,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from contactos;
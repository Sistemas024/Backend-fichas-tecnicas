const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para manejar el registro de usuarios
app.post('/registro', (req, res) => {
  const newUser = req.body;

  // Leer el archivo JSON y agregar el nuevo usuario
  fs.readFile('users.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo' });
    }

    const users = data ? JSON.parse(data) : [];
    users.push(newUser);

    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar el usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
const mongoURI = 'mongodb+srv://sistemasrl021:Systems0125*@cluster0.tj9st.mongodb.net/Sistemas Lastra?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y el modelo del usuario
const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Ruta para manejar el registro de usuarios
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  // Crear un nuevo usuario con el modelo de mongoose
  const newUser = new User({ nombre, email, password });

  try {
    // Guardar el usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

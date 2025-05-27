import cors from 'cors';
import express from 'express';
import productosRoutes from './routes/productosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('✅ Backend funcionando correctamente 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

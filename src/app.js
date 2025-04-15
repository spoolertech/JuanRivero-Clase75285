import express from 'express';
import productosRouter from './routes/productos.routes.js';
import carritosRouter from './routes/carritos.routes.js';

const app = express();

app.use(express.json());

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
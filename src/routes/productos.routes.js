import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const productos = await productManager.getAll();
  res.json(productos);
});

router.get('/:pid', async (req, res) => {
  const producto = await productManager.getById(req.params.pid);
  producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;

  if (!title || !description || !code || !price || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const nuevoProducto = await productManager.add({ title, description, code, price, status, stock, category });
  res.status(201).json(nuevoProducto);
});

router.put('/:pid', async (req, res) => {
  const actualizado = await productManager.update(req.params.pid, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
  const eliminado = await productManager.delete(req.params.pid);
  eliminado ? res.sendStatus(204) : res.status(404).json({ error: 'Producto no encontrado' });
});

export default router;

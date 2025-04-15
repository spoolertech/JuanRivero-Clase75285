import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  const nuevoCarrito = await cartManager.createCart();
  res.status(201).json(nuevoCarrito);
});

router.get('/:cid', async (req, res) => {
  const carrito = await cartManager.getCartById(req.params.cid);
  carrito ? res.json(carrito.products) : res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/producto/:pid', async (req, res) => {
  const resultado = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  resultado ? res.json(resultado) : res.status(404).json({ error: 'Carrito no encontrado o ID inválido' });
});

export default router;
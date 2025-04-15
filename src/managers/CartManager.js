import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const filePath = path.resolve('src/data/carritos.json');

export default class CartManager {
  constructor() {
    this.path = filePath;
  }

  async _getCarritos() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _saveCarritos(carritos) {
    await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
  }

  async createCart() {
    const carritos = await this._getCarritos();
    const nuevoCarrito = {
      id: crypto.randomUUID(),
      products: []
    };
    carritos.push(nuevoCarrito);
    await this._saveCarritos(carritos);
    return nuevoCarrito;
  }

  async getCartById(id) {
    const carritos = await this._getCarritos();
    return carritos.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carritos = await this._getCarritos();
    const carrito = carritos.find(c => c.id === cid);
    if (!carrito) return null;

    const productoExistente = carrito.products.find(p => p.product === pid);
    if (productoExistente) {
      productoExistente.quantity += 1;
    } else {
      carrito.products.push({ product: pid, quantity: 1 });
    }

    await this._saveCarritos(carritos);
    return carrito;
  }
}

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const filePath = path.resolve('src/data/productos.json');

export default class ProductManager {
  constructor() {
    this.path = filePath;
  }

  async _getProductos() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _saveProductos(productos) {
    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
  }

  async getAll() {
    return await this._getProductos();
  }

  async getById(id) {
    const productos = await this._getProductos();
    return productos.find(p => p.id === id);
  }

  async add(producto) {
    const productos = await this._getProductos();
    const nuevoProducto = {
      id: crypto.randomUUID(),
      status: producto.status ?? true,
      thumbnails: [],
      ...producto
    };
    productos.push(nuevoProducto);
    await this._saveProductos(productos);
    return nuevoProducto;
  }

  async update(id, data) {
    const productos = await this._getProductos();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;

    const productoActualizado = { ...productos[index], ...data, id };
    productos[index] = productoActualizado;
    await this._saveProductos(productos);
    return productoActualizado;
  }

  async delete(id) {
    const productos = await this._getProductos();
    const nuevosProductos = productos.filter(p => p.id !== id);
    if (nuevosProductos.length === productos.length) return false;

    await this._saveProductos(nuevosProductos);
    return true;
  }
}



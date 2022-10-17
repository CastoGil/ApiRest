const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
class ProductosApi {
  constructor() {
    this.productos = [
      {
        id: uuidv4(),
        title: "Remera",
        price: 2000,
      },
      {
        id: uuidv4(),
        title: "Pantalon",
        price: 3000,
      },
    ];
  }
  validate(object) {
    if (
      !object.title ||
      !object.price ||
      typeof object.title !== "string" ||
      typeof object.price !== "number"
    )
      throw createError(400, "Datos invalidos");
  }
  existProducts(id) {
    const indice = this.productos.findIndex((idProduct) => idProduct.id == id);
    return indice >= 0;
  }
  getAll() {
    return this.productos;
  }
  getById(id) {
    const exist = this.existProducts(id);
    if (!exist) throw createError(404, "El producto no fue encontrado");
    const indice = this.productos.findIndex((idProduct) => idProduct.id == id);
    return this.productos[indice];
  }
  save(object) {
    this.validate(object);
    const newObject = {
      title: object.title,
      price: object.price,
      id: uuidv4(),
    };
    this.productos.push(newObject);
    return newObject;
  }
  findById(id, object) {
    const exist = this.existProducts(id);
    if (!exist) throw createError(404, "El producto no fue encontrado");
    this.validate(object);
    const indice = this.productos.findIndex((idProduct) => idProduct.id == id);
    const objectold = this.productos[indice];
    const newObject = {
      title: object.title,
      price: object.price,
      id: objectold.id,
    };
    this.productos.splice(indice, 1, newObject);
    return newObject;
  }
  findByIdDelete(id) {
    const exist = this.existProducts(id);
    if (!exist) return;
    const indice = this.productos.findIndex((idProduct) => idProduct.id == id);
    this.productos.splice(indice, 1);
  }
}
const instanciaProductsApi = new ProductosApi();
module.exports = {
  ProductsController: instanciaProductsApi,
};

const { Router } = require("express");
const { ProductsController } = require("../controller/productos.js");
const router = Router();
router.get("/", (req, res) => {
  res.json({
    msg: ProductsController.getAll(),
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const idProduct = ProductsController.getById(id);
  res.json({
    msg: idProduct,
  });
});
router.post("/", (req, res) => {
  const { body } = req;
  const info=ProductsController.save(body)
  console.log(info);
  res.json({
    msg: info,
  });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { body } = req;
  res.json({
    msg: ProductsController.findById(id, body),
  });
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
    msg: ProductsController.findByIdDelete(id),
  });
});
module.exports = router;

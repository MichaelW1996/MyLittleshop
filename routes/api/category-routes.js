const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }], // be sure to include its associated Products
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error occured:", err);
    res.status(500).json({ error: "An error occured" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  } // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const newCat = await Category.create({
      category_name,
    });
    console.log(newCat);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;

  try {
    const category = await Category.update(
      { category_name },
      { where: { id: categoryId } }
    );
    if (!category[0]) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!category) {
      res.status(404).json({ message: "No category found" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;

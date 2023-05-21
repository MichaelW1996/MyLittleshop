const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      //finds all in the model category
      include: [{ model: Product }], // be sure to include its associated Products
    });
    res.status(200).json(categories); //returns results with 200 status (good)
  } catch (err) {
    //if there is an error
    console.error("Error occured:", err); //tell the console
    res.status(500).json({ error: "An error occured" }); //and the user
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id, //find one where the categoryid matches the /:id at the end of our path
      },
      include: [{ model: Product }], // be sure to include its associated Products
    });
    if (category) {
      //if valid data is retreived
      res.status(200).json(category); //show data
    } else {
      //otherwise
      res.status(404).json({ error: "Not found" }); //tell user that noting matched the /:id
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const { category_name } = req.body; //deconstruct the category_name from the request
  try {
    const newCat = await Category.create({
      //create a new category using the deconstructed name from request
      category_name,
    });
    console.log(newCat);
    res.status(200).json(newCat); //show the user the new entry
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const categoryId = req.params.id; //get the entry id from the end of path /:id
  const { category_name } = req.body; //get the updated name from the req.body

  try {
    const category = await Category.update(
      { category_name }, //update name
      { where: { id: categoryId } } //only wher the id matches the id in the path
    );
    if (!category[0]) {
      //if there is no valid data
      res.status(400).json({ message: "Not found" }); //tell the user
      return;
    }
    res.status(200).json("Category updated"); //tell the user if it was a success
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      //delete entry
      where: { id: req.params.id }, //only where id matches the end of the path /:id
    });
    if (!category) {
      //if the reply is blank (should return number of lines/entries affected)
      res.status(404).json({ message: "No category found" }); //say we couldnt find anything with than id
      return;
    }
    res.status(200).json("category deleted"); //if successful, tell the user
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;

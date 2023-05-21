const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tag);
  } catch (err) {
    console.error("Error occured", err);
    res.status(500).json({ error: "An error occured" });
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({
      tag_name,
    });
    console.log(newTag);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  const tagId = req.params.id;
  const { tag_name } = req.body;

  try {
    const tag = await Tag.update({ tag_name }, { where: { id: tagId } });
    if (!tag[0]) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tag) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // delete on tag by its `id` value
});

module.exports = router;

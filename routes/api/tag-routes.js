const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{ model: Product }], //find all in tag model
    });
    res.status(200).json(tag); //show the data to the user
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
      where: { id: req.params.id }, //get entry where id matches the end of path /:id
      include: [{ model: Product }],
    });
    if (tag) {
      res.status(200).json(tag); //show the user the matching entry
    } else {
      res.status(404).json({ error: "Not found" }); //if no matches tell the user nothing had the id provided
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  const { tag_name } = req.body; //deconstruct the name from the req.body
  try {
    const newTag = await Tag.create({
      tag_name, //create a new tag using name from the request
    });
    console.log(newTag);
    res.status(200).json("new tag created"); //and tell the user it was a success
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  const tagId = req.params.id; //get id from end of path /:id
  const { tag_name } = req.body; //get name from the request body

  try {
    const tag = await Tag.update({ tag_name }, { where: { id: tagId } }); //update the tag with id matching end of path /:id to have the name in the request body
    if (!tag[0]) {
      //if the response is blank (should not be case as a response should be given to say its been updated)
      res.status(400).json({ message: "Not found" }); //tells user if no response, which means nothing found at this id
      return;
    }
    res.status(200).json("tag updated"); //tells user if a success
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id }, //deletes entry where id matches end of path /:id
    });
    if (!tag) {
      //if nothing is returned (successful delete should return number of lines/entries removed)
      res.status(404).json({ message: "Not found" }); //tell the user nothing was found
      return;
    }
    res.status(200).json("tag deleted"); //if a success, tell the user
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
  }
  // delete on tag by its `id` value
});

module.exports = router;

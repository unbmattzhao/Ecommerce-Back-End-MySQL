const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.status(404).json({ message: "No tags found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const affectedRows = await Tag.update(req.body, {
      // update a tag's name by its `id` value
      where: { id: req.params.id },
    });

    if (!affectedRows || affectedRows[0] === 0) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    const updatedTag = await Tag.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Tag updated", tag: updatedTag });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a tag by its `id` value
  try {
    const affectedRows = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: "Tag deleted" });
    } else {
      res.status(404).json({ message: "No tag found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No categories found!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No categories found!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    if (!categoryData) {
      res.status(404).json({ message: "No categories found!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const affectedRows = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!affectedRows || affectedRows[0] === 0) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    const updatedCategory = await Category.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const affectedRows = await Category.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "No category found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
    Tag.findAll({
    // be sure to include its associated Product data
    include: []
    }) 
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
  // be sure to include its associated Product data
  include: []
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({})
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

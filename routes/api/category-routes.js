const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(categories);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  res.send("find catagories by id");
});

router.post('/', (req, res) => {
  // create a new category
  res.send("create new catagory")
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  res.send("update a category");
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  res.send("delete ID");
});

module.exports = router;

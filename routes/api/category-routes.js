const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const items = await Category.findAll({
      include: [{model:Product}],
    });
    return res.status(200).json(items);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const item = await Category.findByPk(req.params.id, {
      include: [{model:Product}],
    });
    if(!item)
      return res.status(404).json({message: 'No category found with that id.'});

    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const item = await Category.create(req.body);
    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const item = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!item || item[0] == 0)
      return res.status(404).json({message: 'No category found with that id.'});

    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const item = await Category.destroy({
      where:{
        id: req.params.id,
      },
    });
    if(!item)
      return res.status(404).json({message: 'No category found with that id.'});
    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try{
    const items = await ProductTag.findAll();
    if(!items[0])
      return res.status(404).json({message:'Unable to find any product tags'});

    return res.status(200).json(items);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const item = await ProductTag.findByPk(req.params.id);

    if(!item)
      return res.status(404).json({message: 'Unable to find product tag with ID'});

    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const data = await ProductTag.create(req.body);

    res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const item = await ProductTag.update(req.body, {
      where:{
        id: req.params.id,
      },
    });
    if(!item || item[0] == 0)
      return res.status(404).json({message: 'No ProductTag found with that id.'});
    res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const data = await ProductTag.destroy({
      where:{id: req.params.id},
    });
    if(!data)
      return res.status(404).json({message: 'No ProductTag found with that id.'});

    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);
  }
});

module.exports = router;

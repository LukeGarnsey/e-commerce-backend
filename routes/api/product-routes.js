const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  try{
    const items = await Product.findAll({
      include: [{model:Category}, {model: Tag}],
    });
    return res.status(200).json(items);
  }catch(err){
    return res.status(500).json(err);
  }
  
});

// get one product
router.get('/:id', async(req, res) => {
  try{
    const item = await Product.findByPk(req.params.id);
    if(!item)
      return res.status(404).json({message: 'No item found with that id.'});

    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try{
    const item = await Product.create(req.body);
    if(req.body.tagIds.length){
      
      const productTagIdArr = req.body.tagIds.map(tag_id =>{
        return{
          product_id:item.id,
          tag_id
        };
      });
      
      const productTagItems = await ProductTag.bulkCreate(productTagIdArr);
      return res.status(200).json(productTagItems);
    }
    
    return res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try{
    const product = await Product.update(req.body,{
      where:{id:req.params.id,},
    });
    if(!product)
      return res.status(404).json({message:'No product with ID found.'});

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where:{product_id: req.params.id}
      });
      
      const productTagIds = productTags.map(({tag_id}) => tag_id);
      const newProductTags = req.body.tagIds.filter((tag_id)=> !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
      const productTagsToRemove = productTags.filter(({tag_id}) => !req.body.tagIds.includes(tag_id));
      const temp = productTagsToRemove.map(({id}) => id);
      if(temp[0]){
        const prod = await ProductTag.destroy({where: {id:temp}});
      }
      if(newProductTags[0]){
        const productTagStuff = await ProductTag.bulkCreate(newProductTags);
      }
     
      return res.status(200).json(productTags)
  }
  }catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try{
    const item = Product.destroy({
        where:{
        id: req.params.id,
      }
    });
    if(!item)
      return res.status(404).json({message: 'No item found with that id.'});
    res.status(200).json(item);
  }catch(err){
    return res.status(500).json(err);
  }
  // delete one product by its `id` value
});

module.exports = router;

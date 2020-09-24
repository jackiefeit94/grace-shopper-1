const router = require('express').Router()
//assuming the db model is called Product
const {Product, User} = require('../db/models')
const {Cart, OrderProducts} = require('../db/models/cart')
const {users} = require('../../script/data')

//all products api route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//single products api route
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

//admin create new product api route
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

//admin edit product api route
router.put('/:productId', async (req, res, next) => {
  try {
    const oneProduct = await Product.findByPk(req.params.productId)
    const updateProd = await oneProduct.update(req.body)
    res.json(updateProd)
  } catch (error) {
    next(error)
  }
})

//admin delete product api route
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router

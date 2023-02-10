const express = require('express')
const { verifyToken } = require('../middlewares/auth')
const {
  userLogIn,
  userSignUp,
  updateUserProfile,
  getUserDetails,
} = require('../controller/userController')

const {
  addProduct,
  getProductsByUserId,
  updateProductById,
  getProductDetailById,
  deleteSingleProduct,
  getAllProducts,
} = require('../controller/productController')
const upload = require('../middlewares/upload')

const router = express.Router()

//users
router.post('/signup', upload, userSignUp)
router.post('/login', userLogIn)
router.patch('/updateUserProfile/:id', upload, verifyToken, updateUserProfile)
router.get('/getUserDetails/:id', verifyToken, getUserDetails)

//products
router.get('/getAllProducts', getAllProducts)

router.post('/addProduct', upload, verifyToken, addProduct)
router.get('/getProductsByUserId/:id', verifyToken, getProductsByUserId)
router.put('/updateProductById/:id', upload, verifyToken, updateProductById)
router.get('/getProductDetailById/:id', verifyToken, getProductDetailById)

//delete product
router.delete('/deleteSingleProduct/:id', verifyToken, deleteSingleProduct)

module.exports = router

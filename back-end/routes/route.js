const express = require('express')
const { verifyToken } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

const { getRecommendedProducts } = require('../controller/recommend')

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
  searchProducts,
  addLikes,
  getProductsByType,
  getProductsFromSpecificUser,
} = require('../controller/productController')

const {
  sendEmailAndStoreRentalDetails,
  changeProductStatus,
} = require('../controller/rentalDetailsController')

const {
  adminLogIn,
  getAllUsers,
  getWholeProducts,
  deleteUsers,
  deleteProducts,
  getTotalUsersAndProducts,
  getRentalDetails,
} = require('../controller/adminController')

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
router.get('/getProductDetailById/:id', getProductDetailById)
router.get('/getProductsByType', getProductsByType)
router.get('/getProductsFromSpecificUser/:id', getProductsFromSpecificUser)

//delete product
router.delete('/deleteSingleProduct/:id', verifyToken, deleteSingleProduct)

//search products
router.get('/searchProducts/:key', searchProducts)

//checking and adding likes to the product
router.post('/addLikes/:id', verifyToken, addLikes)

//for admin
router.post('/adminLogin', adminLogIn)
router.get('/getAllUsers', verifyToken, getAllUsers)
router.get('/getWholeProducts', verifyToken, getWholeProducts)
router.delete('/deleteUsers', verifyToken, deleteUsers)
router.delete('/deleteProducts', verifyToken, deleteProducts)
router.get('/getTotalUsersAndProducts', verifyToken, getTotalUsersAndProducts)
router.get('/getRentalDetails', verifyToken, getRentalDetails)

//for sending email to owner and store the rental details in database
router.post(
  '/sendEmailAndStoreRentalDetails',
  verifyToken,
  sendEmailAndStoreRentalDetails
)
router.put('/changeProductStatus/:id', verifyToken, changeProductStatus)

//for recommending products to users
router.get('/getRecommendedProducts/:id', getRecommendedProducts)

module.exports = router

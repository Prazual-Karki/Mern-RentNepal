const Product = require('../models/productSchema')

const addProduct = async (request, response) => {
  try {
    const exist = await Product.findOne({ photo: request.file.path })
    if (exist) {
      return response.status(200).json('Shoes already exist')
    } else {
      const product = new Product({
        name: request.body.name,
        price: request.body.price,
        size: request.body.size,
        type: request.body.type,
        location: request.body.location,
        photo: request.file.path,
        userId: request.body.userId,
        status: request.body.status,
      })
      if (
        !product.name ||
        !product.price ||
        !product.size ||
        !product.type ||
        !product.location ||
        !product.photo ||
        !product.userId ||
        !product.status
      ) {
        return response.status(401).json('please fill out the empty field')
      } else {
        let productDetail = await product.save()
        return response.status(201).json(productDetail)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

//get products uploaded by a single user
const getProductsByUserId = async (request, response) => {
  try {
    const products = await Product.find({ userId: request.params.id })
    if (products.length > 0) {
      return response.status(200).json(products)
    } else {
      return response.status(200).json('no products found')
    }
  } catch (error) {
    console.log(error)
  }
}

//update product details by product id
const updateProductById = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
    if (!product) return response.status(404).json('product not found')

    const photo = request.file ? request.file.path : request.body.photo
    const { name, price, size, type, location, status } = request.body
    const updatedProduct = await Product.findByIdAndUpdate(
      request.params.id,
      { name, price, size, type, location, status, photo },
      { new: true }
    )
    response.status(200).json('shoes updated succesfully')
  } catch (error) {
    console.log(error)
  }
}

const getProductDetailById = async (request, response) => {
  try {
    const productDetails = await Product.findOne({ _id: request.params.id })
    const { name, price, size, type, location, status, photo } = productDetails
    if (productDetails) {
      return response
        .status(200)
        .json({ name, price, size, type, location, status, photo })
    } else {
      return response.status(404).json('product not found')
    }
  } catch (error) {
    console.log(error)
  }
}

//to delete one products with product id
const deleteSingleProduct = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
    if (!product) return response.status(404).json('product not found')
    const deleteSuccess = await Product.deleteOne({ _id: request.params.id })
    if (deleteSuccess) {
      return response.status(200).json('product deleted succesfully')
    } else {
      response.status(404).json('cannot delete product...')
    }
  } catch (error) {
    response.status(404).json(error)
  }
}

//get all products
const getAllProducts = async (request, response) => {
  try {
    const products = await Product.find()
    if (products.length > 0) {
      return response.status(200).json(products)
    } else {
      return response.status(400).json('no products found')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addProduct,
  getProductsByUserId,
  updateProductById,
  getProductDetailById,
  deleteSingleProduct,
  getAllProducts,
}

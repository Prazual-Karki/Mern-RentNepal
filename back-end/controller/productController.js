const Product = require('../models/productSchema')
const User = require('../models/userSchema')

const addProduct = async (request, response) => {
  try {
    const exist = await Product.findOne({ photo: request.file.path })
    if (exist) {
      return response.status(200).json('product already exist')
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
        description: request.body.description,
      })
      if (
        !product.name ||
        !product.price ||
        !product.size ||
        !product.type ||
        !product.location ||
        !product.photo ||
        !product.userId
      ) {
        return response.status(401).json('please fill out the empty field')
      } else {
        let productDetail = await product.save()
        return response.status(201).json(productDetail)
      }
    }
  } catch (error) {
    response.status(400).json(error)
    // console.log(error)
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
    return response.status(400).json(error)
  }
}

//update product details by product id
const updateProductById = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
    if (!product) return response.status(404).json('product not found')

    const photo = request.file ? request.file.path : request.body.photo
    const { name, price, size, type, location, status, description } =
      request.body
    await Product.findByIdAndUpdate(
      request.params.id,
      { name, price, size, type, location, status, photo, description },
      { new: true }
    )
    response.status(200).json('product updated succesfully')
  } catch (error) {
    return response.status(400).json(error)
  }
}

const getProductDetailById = async (request, response) => {
  try {
    const productDetails = await Product.findOne({ _id: request.params.id })
    const userId = productDetails.userId
    const userDetails = await User.findOne({ _id: userId })
    // const { name, price, size, type, location, status, photo } = productDetails
    const { _id, firstname, lastname, phone, photo, email } = userDetails

    if (productDetails && userDetails) {
      return response.status(200).json({
        productDetails,
        userDetails: { _id, firstname, lastname, phone, photo, email },
      })
    } else {
      return response.status(404).json('product not found')
    }
  } catch (error) {
    return response.status(400).json(error)
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
    return response.status(400).json(error)
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
    return response.status(400).json(error)
  }
}

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      // .populate('category', '_id name')
      // .populate('subs', '_id name')
      // .populate('brand', '_id name')
      .exec()
    res.json(products)
  } catch (err) {
    console.log(err)
  }
}
const searchFilters = async (req, res) => {
  const { price } = req.body

  if (price !== undefined) {
    console.log('price', price)
    await handlePrice(req, res, price)
  }
}
const getProductsByType = async (request, response) => {
  try {
    const category = request.query.type
    const products = await Product.find({ type: category, status: 'available' })
    if (products.length > 0) {
      return response.status(200).json(products)
    } else {
      return response.status(400).json('no products found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//search products by key as params
const searchProducts = async (request, response) => {
  try {
    const searchProducts = await Product.find({
      $or: [
        { name: { $regex: request.params.key } },
        { type: { $regex: request.params.key } },
        { location: { $regex: request.params.key } },
      ],
    })
    return response.status(200).json(searchProducts)
  } catch (error) {
    return response.status(400).json(error)
  }
}

const addLikes = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
    const userId = request.body.userId
    if (!product) {
      return response.status(404).json({ msg: 'Product not found' })
    }

    if (!userId) {
      return response.status(400).json({ msg: 'missing userid' })
    }

    // Check if the user has already liked the product
    if (product.likes.includes(userId)) {
      return response
        .status(400)
        .json({ msg: 'You have already liked this product' })
    } else {
      // Add the user's ID to the likes array for the product
      product.likes.push(userId)
      await product.save()

      return response.status(200).json('you liked this product')
    }
  } catch (error) {
    return response.status(400).json({ error: error })
  }
}
const getProductsFromSpecificUser = async (request, response) => {
  try {
    const products = await Product.find({
      userId: request.params.id,
      status: 'available',
    })
    if (products.length > 0) {
      return response.status(200).json(products)
    } else {
      return response.status(400).json('no products found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

module.exports = {
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
  handlePrice,
  searchFilters,
}

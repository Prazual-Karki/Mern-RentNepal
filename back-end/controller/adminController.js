const Admin = require('../models/adminSchema')
const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const RentalDetails = require('../models/rentalDetailsSchema')

const Jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const jwtKey = process.env.JWT_KEY

// admin can't be registered, instead added manually on database.
//for admin log in
const adminLogIn = async (request, response) => {
  const { email, password } = request.body

  try {
    if (email && password) {
      // Check if the admin exists in the database
      const admin = await Admin.findOne({ email })

      if (admin && admin.isAdmin) {
        // Check if the password is correct
        if (password === admin.password) {
          const payload = {
            id: admin.id,
            email: admin.email,
          }
          Jwt.sign(payload, jwtKey, (err, token) => {
            if (err) {
              response
                .status(500)
                .json('something went wrong in token generation')
            }
            const { _id, email } = admin
            response.status(200).json({ admin: { _id, email }, auth: token })
          })
        } else {
          return response.status(400).json('password incorrect')
        }
      } else {
        return response.status(400).json('email not found')
      }
    } else {
      return response.status(400).json('email and password required')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

const getTotalUsersAndProducts = async (request, response) => {
  try {
    const totalUsers = await User.countDocuments({})
    const totalProducts = await Product.countDocuments({})
    return response.status(200).json({ totalUsers, totalProducts })
  } catch (error) {
    return response.status(400).json(error)
  }
}

//get all users from database
const getAllUsers = async (request, response) => {
  try {
    const users = await User.find()
    if (users.length > 0) {
      return response.status(200).json(users)
    } else {
      return response.status(200).json('no users found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//get all products from database
const getWholeProducts = async (request, response) => {
  try {
    const products = await Product.find()
    if (products.length > 0) {
      return response.status(200).json(products)
    } else {
      return response.status(200).json('no products found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//delete users from database some or all, providing array of ids
const deleteUsers = async (request, response) => {
  const { ids } = request.body
  try {
    if (!ids) {
      return response
        .status(400)
        .json('provide some user ids for delete operation')
    }
    const deleteSuccess = await User.deleteMany({ _id: { $in: ids } })
    if (deleteSuccess) {
      await Product.deleteMany({ userId: { $in: ids } })
      return response
        .status(200)
        .json(`${deleteSuccess.deletedCount} users deleted`)
    } else {
      return response.status(400).json('users not deleted. something wrong...')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//delete products from database some or all, providing array of ids
const deleteProducts = async (request, response) => {
  const { ids } = request.body
  try {
    if (!ids) {
      return response.status(400).json('provide some ids for delete operation')
    }
    const deleteSuccess = await Product.deleteMany({ _id: { $in: ids } })
    if (deleteSuccess) {
      return response
        .status(200)
        .json(`${deleteSuccess.deletedCount} products deleted`)
    } else {
      return response
        .status(400)
        .json('product not deleted. something wrong...')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}
const getRentalDetails = async (request, response) => {
  try {
    const rentalProducts = await RentalDetails.find()
    if (rentalProducts.length > 0) {
      return response.status(200).json(rentalProducts)
    } else {
      return response.status(200).json('no rental transaction found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

module.exports = {
  adminLogIn,
  getAllUsers,
  getWholeProducts,
  deleteUsers,
  deleteProducts,
  getTotalUsersAndProducts,
  getRentalDetails,
}

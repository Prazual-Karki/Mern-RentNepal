const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const jwtKey = process.env.JWT_KEY

//for registering  users
const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ email: request.body.email })
    if (exist) {
      return response.status(200).json('User already exist with this email')
    } else {
      const user = new User({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        password: request.body.password,
        address: request.body.address,
        phone: request.body.phone,
        gender: request.body.gender,
        photo: request.file.path,
        // photo: {
        //   name: request.file.path,
        //   data: request.file.filename,
        //   contentType: 'image/jpeg',
        // },
      })

      if (
        !user.firstname ||
        !user.lastname ||
        !user.email ||
        !user.password ||
        !user.address ||
        !user.phone ||
        !user.photo ||
        !user.gender
      ) {
        return response.status(401).json('please fill out the empty field')
      } else {
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err
            user.password = hash
            user.save().then((user) => {
              const payload = {
                id: user.id,
                email: user.email,
              }

              //generate jsonwebtoken for authentication
              Jwt.sign(payload, jwtKey, (err, token) => {
                if (err) {
                  response
                    .status(401)
                    .json('something went wrong in authentictaion')
                }
                const { _id, firstname, lastname, email, photo } = user
                response
                  .status(200)
                  .json({
                    user: { _id, firstname, lastname, email, photo },
                    auth: token,
                  })
              })
            })
          })
        })
      }
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//for logging users
const userLogIn = async (request, response) => {
  const email = request.body.email
  const password = request.body.password

  try {
    if (email && password) {
      const user = await User.findOne({ email })
      if (user) {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
            }
            Jwt.sign(payload, jwtKey, (err, token) => {
              if (err) {
                response
                  .status(500)
                  .json('something went wrong in token generation')
              }
              const { _id, firstname, lastname, email, photo } = user
              response
                .status(200)
                .json({
                  user: { _id, firstname, lastname, email, photo },
                  auth: token,
                })
            })
          } else {
            return response.status(200).json('password incorrect')
          }
        })
      } else {
        return response.status(200).json('email not found')
      }
    } else {
      return response.status(400).json('email and password required')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

//update user profile with their id
const updateUserProfile = async (request, response) => {
  try {
    // const id = req.body._id
    const user = await User.findById(request.params.id)
    if (!user) return response.status(404).json('User not found')
    const photo = request.file ? request.file.path : request.body.photo
    const { firstname, lastname, address, phone } = request.body

    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { firstname, lastname, address, phone, photo },
      { new: true }
    ).select('-password')
    response.status(200).json(updatedUser)
  } catch (error) {
    return response.status(400).json(error)
  }
}

//get specific  user Details by their id
const getUserDetails = async (request, response) => {
  try {
    const userDetails = await User.findOne({ _id: request.params.id })
    const { firstname, lastname, email, address, phone, photo } = userDetails
    if (userDetails) {
      return response
        .status(200)
        .json({ firstname, lastname, email, address, phone, photo })
    } else {
      return response.status(404).json('User not found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

module.exports = { userLogIn, userSignUp, updateUserProfile, getUserDetails }

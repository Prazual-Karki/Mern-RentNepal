const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const Rental = require('../models/rentalDetailsSchema')
const Product = require('../models/productSchema')
const User = require('../models/userSchema')

const sendEmailAndStoreRentalDetails = async (request, response) => {
  // create a transporter object
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.RENT_EMAIL,
      pass: process.env.RENT_PASSWORD,
    },
  })
  try {
    const { userId, productId, receiverEmail, rentDays } = request.body

    const product = await Product.findById({ _id: productId })
    const user = await User.findById({ _id: userId })
    const gender = user.gender === 'male' ? 'him' : 'her'

    if (!receiverEmail || !product || !user || !rentDays) {
      return response.status(400).json('some details  missing to send email')
    } else {
      // create an email object with the details from the request body
      let mailOptions = {
        from: process.env.RENT_EMAIL,
        to: receiverEmail,
        subject: 'Rent-Nepal Booking',
        text: `${user.firstname} ${user.lastname}(${user.phone}) has booked your ${product.name},of category "${product.type}" for ${rentDays} days. Contact ${gender} for more details ....`,
      }
      let info = await transporter.sendMail(mailOptions)
      console.log(`Email sent: ${info.messageId}`)

      const rental = new Rental({
        userId,
        productId,
        name: product.name,
        price: product.price,
        type: product.type,
        location: product.location,
        productLikes: product.likes.length,
      })

      if (product && user) {
        const rentalSave = await rental.save()
        if (rentalSave && info) {
          return response
            .status(200)
            .json('email send and rental Details saved succesfully')
        }
      } else {
        return response.status(400).json('product or user not found')
      }
    }
  } catch (error) {
    return response.status(400).json({ 'error: ': error })
    // console.log(error)
  }
}

// when customer booked owner products,change product status to "not available"
const changeProductStatus = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
    if (!product) return response.status(404).json('product not found')

    const changed = await Product.findByIdAndUpdate(
      request.params.id,
      { status: request.body.status },
      { new: true }
    )
    if (changed) {
      response.status(200).json('product status changed succesfully')
    } else {
      return response.status(400).json('product status does not changed')
    }
  } catch (error) {
    return response.status(400).json({ 'error: ': error })
    // console.log(error)
  }
}
const getRentalHistoryOfSpecificUser = async (request, response) => {
  try {
    const rentalHistory = await Rental.find({
      userId: request.params.id,
    }).populate('productId')
    const userHistory = []
    for (let i = 0; i < rentalHistory.length; i++) {
      const item = rentalHistory[i]
      const ownerId = item.productId.userId
      const owner = await User.findById({ _id: ownerId })
      const ownerName = owner ? `${owner.firstname} ${owner.lastname}` : 'N/A'

      const data = {
        ownerName: ownerName,
        name: item.name,
        price: item.price,
        type: item.type,
        location: item.location,
        createdAt: item.createdAt,
      }
      userHistory.push(data)
    }

    if (userHistory.length > 0) {
      return response.status(200).json(userHistory)
    } else {
      return response.status(400).json('no products found')
    }
  } catch (error) {
    return response.status(400).json(error)
  }
}

module.exports = {
  sendEmailAndStoreRentalDetails,
  changeProductStatus,
  getRentalHistoryOfSpecificUser,
}

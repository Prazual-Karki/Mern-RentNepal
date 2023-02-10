const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.ex1s9t0.mongodb.net/?retryWrites=true&w=majority`
  try {
    await mongoose.connect(URL)

    console.log('Database Connected Succesfully')
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

module.exports = Connection

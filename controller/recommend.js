const RentalProducts = require('../models/rentalDetailsSchema')
const Product = require('../models/productSchema')
const natural = require('natural')
const { Matrix } = require('ml-matrix')

const getRecommendedProducts = async (request, response) => {
  try {
    function cosineSimilarity(a, b) {
      const matA = new Matrix([a])
      const matB = new Matrix([b])

      //dotProduct = a vector * b vector
      const dotProduct = matA.mmul(matB.transpose()).get(0, 0)
      //normA = ||a||
      const normA = matA.norm()
      const normB = matB.norm()
      const similarity = dotProduct / (normA * normB)

      return similarity
    }
    // Define the user's rental history
    const userId = request.params.id
    const threshold = 1
    if (userId) {
      // Retrieve the user's rental history
      const rentalDetails = await RentalProducts.find({
        userId: userId,
      }).populate('productId')

      // Find all available products
      const products = await Product.find({ status: 'available' })
      const availableProducts = products.filter(
        (product) => product.userId !== userId
      )
      // Calculate similarity scores for each available product
      const recommendedProducts = []

      for (let i = 0; i < availableProducts.length; i++) {
        const product = availableProducts[i]

        let similarityScore = 0

        const array2 = [product.name, product.type, product.location]

        for (let j = 0; j < rentalDetails.length; j++) {
          const rentalDetail = rentalDetails[j]
          const array1 = [
            rentalDetail.name,
            rentalDetail.type,
            rentalDetail.location,
          ]
          const allWords = [...new Set([...array1, ...array2])]
          const tfidf = new natural.TfIdf()
          tfidf.addDocument(array1)
          tfidf.addDocument(array2)
          const vector1 = allWords.map((word) => tfidf.tfidf(word, 0)) // 0 index document
          const vector2 = allWords.map((word) => tfidf.tfidf(word, 1))

          const similarity = cosineSimilarity(vector1, vector2)

          similarityScore += similarity
        }

        // similarityScore /= rentalDetails.length
        // console.log(similarityScore)

        if (similarityScore >= threshold) {
          recommendedProducts.push({
            product,
            similarityScore,
          })
        }
      }

      recommendedProducts.sort((a, b) => b.similarityScore - a.similarityScore)
      if (recommendedProducts.length < 1) {
        return response.status(200).json(availableProducts)
      } else {
        return response
          .status(200)
          .json(recommendedProducts.map((item) => item.product))
      }
    } else {
      return response.status(400).json('provide user id')
    }
  } catch (error) {
    return response.status(400).json({ error: error })
  }
}

module.exports = { getRecommendedProducts }

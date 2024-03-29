import React from 'react'
import Shoe from '../Product/Shoe'
import { Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecommendSection = () => {
  const [products, setproducts] = useState([])
  var cancelToken
  const userId = JSON.parse(localStorage.getItem('users'))._id

  useEffect(() => {
    fetchData()

    return () => {
      if (cancelToken) {
        cancelToken('Cleanup function called before request completion.')
      }
    }
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getRecommendedProducts/${userId}`,
        {
          cancelToken: new axios.CancelToken((token) => (cancelToken = token)),
        }
      )
      setproducts(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('fetch cancelled for cleanup of product.js')
      }
    }
  }

  return (
    <>
      <Typography variant='h4' gutterBottom my={4} textAlign='center'>
        Recommended for you
      </Typography>
      {products.length > 0 ? (
        <Grid container spacing={2} rowSpacing={3}>
          {products.map((item) => {
            return <Shoe key={item._id} data={item} />
          })}
        </Grid>
      ) : (
        <Typography
          mb={2}
          mt={3}
          variant='button'
          component='h6'
          fontSize={22}
          textAlign='center'
        >
          Oops! no product found...
        </Typography>
      )}
    </>
  )
}

export default RecommendSection

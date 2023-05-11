import React from 'react'
import Shoe from './Shoe'
import { Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Products = () => {
  const [products, setproducts] = useState([])
  var cancelToken

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
        'http://localhost:8080/getProductsByType?type=coats',
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
          Oops! no coats found...
        </Typography>
      )}
    </>
  )
}

export default Products

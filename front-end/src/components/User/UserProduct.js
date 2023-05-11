import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Shoe from '../Product/Shoe'

const UserProduct = (props) => {
  const [products, setproducts] = useState([])
  var cancelToken

  useEffect(() => {
    fetchData()

    return () => {
      if (cancelToken) {
        cancelToken('Cleanup function called before request completion.')
      }
    }
  }, [props.data])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getProductsFromSpecificUser/${props.data._id}`,
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
        More from {props.data.firstname} {props.data.lastname}
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

export default UserProduct

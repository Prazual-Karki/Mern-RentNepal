import React from 'react'
import Shoe from './Shoe'
import SearchIcon from '@mui/icons-material/Search'
import { Grid, TextField, Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Products = () => {
  const [products, setproducts] = useState([])
  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get('http://localhost:8080/getAllProducts', {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        console.log(res.data)
        setproducts(res.data)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of dashboard.js')
        }
      })

    return () => {
      cancelToken.cancel()
    }
  }, [])
  return (
    <>
      {Array.isArray(products) ? (
        <>
          <Box
            py={2}
            my={1}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.2)',
            }}
          >
            <Typography variant='button' fontSize={22}>
              popular shoes of the day
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id='input-with-sx'
                label='search shoes..'
                type='search'
                variant='standard'
                sx={{ textAlign: 'center' }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} rowSpacing={3} p={2}>
            {products.map((item) => {
              return <Shoe key={item._id} data={item} />
            })}
          </Grid>
        </>
      ) : (
        <Typography
          mb={2}
          mt={3}
          variant='button'
          component='h6'
          fontSize={22}
          textAlign='center'
        >
          Oops! no shoes have been uploaded yet..
        </Typography>
      )}
    </>
  )
}

export default Products

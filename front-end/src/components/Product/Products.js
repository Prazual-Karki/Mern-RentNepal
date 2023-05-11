import React from 'react'
import Shoe from './Shoe'
import SearchIcon from '@mui/icons-material/Search'
import { Grid, TextField, Box, Typography, Tab, Tabs } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom'

const Products = () => {
  const [products, setproducts] = useState([])
  const [value, setValue] = React.useState('one')
  const [isSearched, setisSearched] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // var cancelToken

  // useEffect(() => {
  //   fetchData()

  //   return () => {
  //     if (cancelToken) {
  //       cancelToken('Cleanup function called before request completion.')
  //     }
  //   }
  // }, [])
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/getAllProducts', {
  //       cancelToken: new axios.CancelToken((token) => (cancelToken = token)),
  //     })
  //     setproducts(response.data)
  //   } catch (error) {
  //     if (axios.isCancel(error)) {
  //       console.log('fetch cancelled for cleanup of product.js')
  //     }
  //   }
  // }

  // useEffect(() => {
  // const cancelToken = axios.CancelToken.source()

  //   getAllProducts()

  //   return () => {
  //     cancelToken.cancel()
  //   }
  // }, [])

  // const getAllProducts = () => {
  //   axios
  //     .get('http://localhost:8080/getAllProducts', {
  //       cancelToken: cancelToken.token,
  //     })
  //     .then((res) => {
  //       console.log('fetched products')
  //       setproducts(res.data)
  //     })
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //         console.log('fetch cancelled for cleanup of dashboard.js')
  //       }
  //     })
  // }

  const handleSearch = async (e) => {
    setisSearched(true)

    let key = e.target.value
    if (key) {
      const searchproducts = await axios.get(
        `http://localhost:8080/searchProducts/${key}`
      )
      if (searchproducts) {
        setproducts(searchproducts.data)
      }
    } else {
      setisSearched(false)
    }
  }

  return (
    <>
      <Box
        py={2}
        my={1}
        mb='1%'
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant='button' fontSize={22}>
          popular product of the day
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id='input-with-sx'
            label='search product..'
            type='search'
            variant='standard'
            sx={{ textAlign: 'center' }}
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          md={3}
          sx={{
            boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.1)',
            transition: '0.3s',
            height: '422px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation='vertical'
            aria-label='secondary tabs example'
          >
            <Tab
              value='one'
              label='All products'
              LinkComponent={Link}
              to='/productList'
            />
            <Tab
              value='two'
              label='Watches'
              LinkComponent={Link}
              to='/productList/watch'
            />
            <Tab
              value='three'
              label='Musical item'
              LinkComponent={Link}
              to='/productList/music'
            />
            <Tab
              value='four'
              label='Coat/Blazers'
              LinkComponent={Link}
              to='/productList/coats'
            />
            <Tab
              value='five'
              label='Ladies item'
              LinkComponent={Link}
              to='/productList/ladiesItem'
            />
            <Tab
              value='six'
              label='Trekking items'
              LinkComponent={Link}
              to='/productList/trekking'
            />
            <Tab
              value='seven'
              label='Bi-Cycle'
              LinkComponent={Link}
              to='/productList/biCycle'
            />
            <Tab
              value='eight'
              label='Carry Bags'
              LinkComponent={Link}
              to='/productList/carryBags'
            />
          </Tabs>
        </Grid>

        <Grid
          item
          xs={8}
          md={9}
          sx={{ overflow: 'auto', height: '419px' }}
          mt='1%'
        >
          {isSearched ? (
            <>
              {products.length > 0 ? (
                <Grid container spacing={2} rowSpacing={3} p={2}>
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
          ) : (
            <Outlet />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Products

//  {products.length > 0 ? (
//   <Grid container spacing={2} rowSpacing={3} p={2}>
//     {products.map((item) => {
//       return <Shoe key={item._id} data={item} />
//      })}
//    </Grid>
//  ) : (
//    <Typography
//      mb={2}
//      mt={3}
//      variant='button'
//      component='h6'
//      fontSize={22}
//      textAlign='center'
//    >
//      Oops! no product found...
//    </Typography>
//  )}

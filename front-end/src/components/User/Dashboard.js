import * as React from 'react'
import Box from '@mui/material/Box'
import { Button, Grid, Typography } from '@mui/material'
import UserShoe from './UserShoe'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BoxSx() {
  const params = useParams()
  const [products, setproducts] = useState([])

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        `http://localhost:8080/getProductsByUserId/${params.id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        },
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
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
  }, [products])
  return (
    <Box
      sx={{
        backgroundColor: '#f5f2f3',
        padding: '2% 2%',
        width: '100%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
        marginBottom: '1%',
        px: '5%',
        py: '2%',
      }}
    >
      <Typography variant='h5'>DASHBOARD</Typography>
      <hr />
      <Typography variant='overline' component='div' fontSize={18}>
        welcome, {JSON.parse(localStorage.getItem('users')).firstname}
      </Typography>
      <Link to='/user/addProduct' style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='error' sx={{ mt: 2, mb: 2 }}>
          upload new product
        </Button>
      </Link>

      <Box>
        {Array.isArray(products) ? (
          <>
            <Typography
              mb={2}
              mt={3}
              variant='button'
              component='h6'
              fontSize={22}
            >
              your Listed Products
            </Typography>
            <Grid container spacing={2} rowSpacing={3}>
              {products.map((item) => {
                return <UserShoe key={item._id} data={item} />
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
            Oops! you haven't uploaded any products
          </Typography>
        )}
      </Box>
    </Box>
  )
}

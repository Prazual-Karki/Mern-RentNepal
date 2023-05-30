import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import CategoryIcon from '@mui/icons-material/Category'

export default function ColorTabs() {
  const [value, setValue] = React.useState('one')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' textAlign='center' pt='2%'>
        WELCOME , ADMIN
      </Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          md={2}
          sx={{
            boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.1)',
            transition: '0.3s',
            height: '425px',
          }}
        >
          {/* <Link to='/admin/allUsers'>users</Link>
          <br />
          <Link to='/admin/allProducts'>products</Link> */}
          <Tabs
            value={value}
            onChange={handleChange}
            orientation='vertical'
            aria-label='secondary tabs example'
            // TabIndicatorProps={{
            //   style: { backgroundColor: 'red' },
            // }}
          >
            <Tab
              icon={<AppsIcon />}
              iconPosition='start'
              value='one'
              label='overview'
              LinkComponent={Link}
              to='/admin'
            />
            <Tab
              icon={<SupervisedUserCircleIcon />}
              iconPosition='start'
              value='two'
              label='All Users'
              LinkComponent={Link}
              to='/admin/allUsers'
            />
            <Tab
              icon={<CategoryIcon />}
              iconPosition='start'
              value='three'
              label='All Products'
              LinkComponent={Link}
              to='/admin/allProducts'
            />
            <Tab
              icon={<AppsIcon />}
              iconPosition='start'
              value='four'
              label='Rental Details'
              LinkComponent={Link}
              to='/admin/rentalDetails'
            />
          </Tabs>
        </Grid>

        <Grid item xs={8} md={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}

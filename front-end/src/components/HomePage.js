import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'
import Footer from './Footer'

import bags from '../images/carouselImage/bags.jpg'
import coats from '../images/carouselImage/coats.jfif'
import trek from '../images/carouselImage/trek.jpg'
import guitar from '../images/carouselImage/guitar.jpg'

import wedding from '../images/carouselImage/wedding.jpg'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import PublicIcon from '@mui/icons-material/Public'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import { Link } from 'react-router-dom'

function IndividualIntervalsExample() {
  const gridStyle = {
    textAlign: 'center',
    padding: '4% 6% 5% 6%',
  }
  return (
    <>
      <Carousel style={{ marginTop: '2px' }}>
        <Carousel.Item interval={5000}>
          <img
            className='d-block w-100'
            src={coats}
            alt='coats'
            height='470px'
          />
          <Carousel.Caption>
            <h2>Join our community of Rent-Nepal</h2>
            <h5>Rent & lend your products now...</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={trek} alt='trek' height='470px' />
          <Carousel.Caption>
            <Typography variant='h5'>want some for trekking ?</Typography>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100'
            src={bags}
            alt='sports shoes'
            height='470px'
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100'
            src={guitar}
            alt='guitar'
            height='470px'
          />
          <Carousel.Caption>
            <Typography variant='h5'>wanna play some music ?</Typography>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '4%',
          marginBottom: '1%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8} padding='4%'>
            <img height='350' width='100%' alt='wedding pic' src={wedding} />
          </Grid>
          <Grid item sx={{ padding: '5%' }} xs={4}>
            <Typography variant='h4' mt='10%'>
              Don't buy , just rent them
            </Typography>
            <br />

            <Link to='/productList' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='error'>
                Rent Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, backgroundColor: '#E8E8E8' }}>
        <Typography variant='h3' textAlign='center' mb={2} pt={4}>
          The Power Of Renting
        </Typography>
        <Typography variant='body2' textAlign='center'>
          From earning money to saving the planet, all whilst having fun getting
          dressed and some enjoyment,
          <br />
          there are so many reasons to join the rental revolution.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4} md={4} style={gridStyle}>
            <CurrencyExchangeIcon color='warning' fontSize='large' />
            <Typography variant='h6' mb={1}>
              EARN MONEY
            </Typography>
            <Typography variant='body2'>
              Let your product work for you and put cash in your pockets.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4} md={4} style={gridStyle}>
            <PublicIcon color='warning' fontSize='large' />
            <Typography variant='h6' mb={1}>
              SAVE THE PLANET
            </Typography>
            <Typography variant='body2'>
              Renting, rather than buying new, reduces the amount of products
              that ends up in landfill each year.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4} md={4} style={gridStyle}>
            <SavingsOutlinedIcon color='warning' fontSize='large' />
            <Typography variant='h6' mb={1}>
              SAVE MONEY
            </Typography>
            <Typography variant='body2'>
              Avoid single use or impulse purchases whilst also saving wardrobe
              space.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default IndividualIntervalsExample

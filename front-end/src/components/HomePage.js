import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'

import formal from '../images/carouselImage/formal2.jpg'
import sneakers from '../images/carouselImage/sneakers.jpg'
import sports from '../images/carouselImage/sports.webp'
import trekshoe from '../images/carouselImage/trekshoe1.jpg'
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
      <Carousel style={{ marginTop: '1px' }}>
        <Carousel.Item interval={5000}>
          <img
            className='d-block w-100'
            src={formal}
            alt='Formal shoes'
            height='450px'
          />
          <Carousel.Caption>
            <h2>Join our community of Rent-Nepal</h2>
            <h5>Rent & lend your shoes now...</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className='d-block w-100'
            src={sneakers}
            alt='Sneakers'
            height='450px'
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className='d-block w-100'
            src={sports}
            alt='sports shoes'
            height='450px'
          />
          <Carousel.Caption>
            <h3>Wanna try sports ?</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className='d-block w-100'
            src={trekshoe}
            alt='Trekking shoes'
            height='450px'
          />
        </Carousel.Item>
      </Carousel>
      <Box sx={{ flexGrow: 1, marginTop: '4%', marginBottom: '1%' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <img height='420' width='100%' alt='wedding pic' src={wedding} />
          </Grid>
          <Grid item sx={{ padding: '5%' }} xs={4}>
            <Typography variant='h4'>LET'S PARTY</Typography>
            <br />
            <Typography variant='body1'>
              Our Favorite season for shoes is here and we are ready!
            </Typography>
            <br />
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
          dressed,
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
              Let your wardrobe work for you and put cash in your pockets.
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
    </>
  )
}

export default IndividualIntervalsExample

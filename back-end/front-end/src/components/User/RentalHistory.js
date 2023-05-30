import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../helper'

export default function RentalHistory() {
  const [rows, setrows] = useState([])
  const params = useParams()
  const dateExtractor = (dateString) => {
    const extractedDate = dateString.split('T')[0]
    return extractedDate
  }
  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        `${BASE_URL}/getRentalHistoryOfSpecificUser/${params.id}`,
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
        setrows(res.data)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of rentalHistory.js')
        }
      })

    return () => {
      cancelToken.cancel()
    }
  }, [rows])
  return (
    <>
      <Typography variant='h5' my={3} textAlign='center'>
        YOUR RENTAL HISTORY
      </Typography>
      {Array.isArray(rows) ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead sx={{ backgroundColor: 'ButtonFace' }}>
              <TableRow>
                <TableCell align='center'>S.N</TableCell>
                <TableCell align='center'>Owner</TableCell>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Category</TableCell>
                <TableCell align='center'>Price/day</TableCell>
                <TableCell align='center'>location</TableCell>
                <TableCell align='center'>Booked date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{row.ownerName}</TableCell>
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.type}</TableCell>
                  <TableCell align='center'>{row.price}</TableCell>

                  <TableCell align='center'>{row.location}</TableCell>
                  <TableCell align='center'>
                    {dateExtractor(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          mb={2}
          mt={3}
          variant='button'
          component='h6'
          fontSize={22}
          textAlign='center'
        >
          Oops! you don't have any rental transaction
        </Typography>
      )}
    </>
  )
}

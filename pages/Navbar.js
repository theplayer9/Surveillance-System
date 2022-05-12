import React from 'react'
import { AppBar, Container, Paper, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <AppBar position="fixed" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ display: 'flex' }}
              onClick={() => {
                ;<Link href="/index">
                  {' '}
                  <a></a>
                </Link>
              }}
            >
              <Image src="/img.jpg" width={70} height={70} />
            </Typography>
            <Paper elevation={3} component="div" sx={{ margin:"0 15px" , padding: "5px 5px"}}>
              <Link href="/ReportComplaint">
                <a> ReportComplaint</a>
              </Link>
            </Paper>
            <Paper elevation={3} component="div" sx={{ margin:"0 15px", padding: "5px 5px" }}>
              <Link href="/Surveillance">
                <a> Surveillance</a>
              </Link>
            </Paper>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar

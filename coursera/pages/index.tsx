import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Grid, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { userEmailState } from '@/store/selector/userEmail'
import { isUserLoading } from '@/store/selector/isUserLoading'
import { Nav } from '@/components/Nav'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const navigate = useRouter();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>
              Coursera Admin
            </Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && <div style={{ display: "flex", marginTop: 20 }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  size={"large"}
                  variant={"contained"}
                  onClick={() => {
                    navigate.push("/signup")
                  }}
                >Signup</Button>
              </div>
              <div>
                <Button
                  size={"large"}
                  variant={"contained"}
                  onClick={() => {
                    navigate.push("/signin")
                  }}
                >Signin</Button>
              </div>
            </div>}
          </div>
          <div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"https://media.istockphoto.com/id/1404046685/vector/classroom-day-2d-anime-background-illustration.jpg?s=612x612&w=0&k=20&c=m4fUlX2J1ZHUuPhumv3YVQWPEDX-Yx9-uK3kMXXwi2Q="} width={"100%"} />
        </Grid>
      </Grid>
    </main>
  )
}

import { Container, Grid, Typography } from '@mui/material'
import { useRef } from 'react'
import { useEffect } from 'react';
export default function Home() {
    // const videoRef = useRef(null)
    // useEffect(() => {
    //     // Check if the video reference exists
    //     if (videoRef.current) {
    //         // Set the start and end time for the portion you want to play
    //         const startTime = 0; // Start time in seconds
    //         const endTime = 10; // End time in seconds

    //         // Play only a portion of the video
    //         const playPartialVideo = () => {
    //             videoRef.current.currentTime = startTime;
    //             videoRef.current.play();

    //             setTimeout(() => {
    //                 videoRef.current.pause();
    //             }, (endTime - startTime) * 1000);
    //         };

    //         // Call the function to play the partial video
    //         playPartialVideo();
    //     }
    // }, []);
    return (
        <>
            <Container maxWidth='lg' >
                <Grid container  columnSpacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" mt={15} style={{ fontWeight: 'bolder', color: 'purple',textAlign:'center'}}>
                            Privacy's Finest Hour: One Password to Rule Them All
                        </Typography>
                        <br/>
                        <Typography variant="body1" style={{ color: 'purple', fontFamily: 'sans-serif' ,textAlign:'center',fontWeight:'bold'}}>
                            Your data remains confidential and is inaccessible to anyone,<br />
                            including us.....<br />
                            Your master password is the exclusive key to unveil and manage your confidential vaults....<br />
                            Our password manager works by securely storing your login credentials in an encrypted vault....
              
                        </Typography>
                       
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src='/static/passw.jpeg' style={{ maxWidth: '100%', height: 'auto' }}  ></img>
                    </Grid>
                   
                    {/* <Grid item xs={12} md={6}>
                         <video controls={false} ref={videoRef} autoPlay loop muted style={{ maxWidth: '100%', height: 'auto' }}>
                            <source src='/static/wc.mp4' type='video/mp4' />
                        </video></Grid> */}
                       
                  
                </Grid>
            </Container>
        </>
    )
}




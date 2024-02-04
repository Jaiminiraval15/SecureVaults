import { Container, Grid, Typography } from '@mui/material'

export default function Home() {
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
                </Grid>
            </Container>
        </>
    )
}




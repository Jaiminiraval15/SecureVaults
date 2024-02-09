import { Box, Container, Grid, Typography,TextField ,Button} from "@mui/material";

export default function(){
    return(
        <>
        <Box>
            <Grid item xs={12}>
        <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>Change Password</Typography>
        </Grid>
       <Container maxWidth="lg">
        <Box sx={{mt:4,textAlign:'center'}}>
            <Grid container justifyContent='center' spacing={2}>
            <Grid item xs={12} sm={12}>
                            <TextField
                                label="Current Password"
                                variant="outlined"
                              
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="New Password"
                                variant="outlined"
                             
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                              
                                fullWidth
                            />
                        </Grid>
            </Grid>
        </Box>
        <Button variant='contained' style={{ marginTop: '2em' }} >Update</Button>
       </Container>
        </Box>
        </>
    )
}
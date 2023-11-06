import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

function NFTPage() {
    return (
        <div>
            <CssBaseline />
            <Container sx={{ paddingTop: "125px" }} maxWidth="xl">
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <img
                            width="400px"
                            src="https://a.d-cd.net/_krF9yCP25Di6Pkk2M_zZuB-stM-960.jpg"
                            alt=""
                        ></img>
                    </Grid>
                    <Grid item xs={6}>
                        <h1 align="center">NFT name</h1>
                        <h3>description</h3>
                    </Grid>
                </Grid>
                <h3>0.3 ETH</h3>
            </Container>
        </div>
    );
}

export default NFTPage;

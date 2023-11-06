import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

function Error() {
    return (
        <div>
            <CssBaseline />
            <Container sx={{ paddingTop: "275px" }} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img
                            width="500px"
                            src="https://a.d-cd.net/_krF9yCP25Di6Pkk2M_zZuB-stM-960.jpg"
                            alt=""
                        ></img>
                    </Grid>
                    <Grid item xs={6}>
                        <h1 align="center">Oops, Something has gone wrong!</h1>
                        <p>debug</p>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Error;

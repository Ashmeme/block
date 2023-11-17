import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ paddingTop: "75px" }}>
                    <h1 align="center">
                        We are a team of young developers, which gives you the
                        opportunity to become the owner of an NFT work of art.
                    </h1>
                </Box>
                <Button sx={{ mt: "100px", ml: "40%" }} variant="contained">
                    <Link to="/marketplace">Browse our shop</Link>
                </Button>
            </Container>
        </div>
    );
}

export default Home;

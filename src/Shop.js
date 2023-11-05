import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MediaCard() {
    return (
        <Card sx={{ maxWidth: 245 }}>
            <CardMedia
                sx={{ height: 250 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Buy</Button>
            </CardActions>
        </Card>
    );
}

const sampleData = [
    {
        name: "NFT#1",
        description: "Alchemy's First NFT",
        website: "http://axieinfinity.io",
        image: "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        price: "0.03ETH",
        currentlySelling: "True",
        address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        name: "NFT#2",
        description: "Alchemy's Second NFT",
        website: "http://axieinfinity.io",
        image: "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
        price: "0.03ETH",
        currentlySelling: "True",
        address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        name: "NFT#3",
        description: "Alchemy's Third NFT",
        website: "http://axieinfinity.io",
        image: "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        price: "0.03ETH",
        currentlySelling: "True",
        address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];

function Shop() {
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ paddingTop: "75px" }}>
                    <h1>NFT Cards</h1>
                </Box>

                {MediaCard()}
            </Container>
        </div>
    );
}

export default Shop;

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Link } from "react-router-dom";
import MarketplaceJSON from "../Marketplace";
import axios from "axios";
import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function NFTTile(data, key) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#E4EEFF",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const newTo = {
        pathname: "/nftPage/" + data.data.tokenId,
    };

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
        <Link to={newTo}>
            <Item>
                <Card sx={{ maxWidth: 245 }}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image={IPFSUrl}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.data.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Buy</Button>
                    </CardActions>
                </Card>
            </Item>
        </Link>
    );
}

const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
};
function Shop() {
    const sampleData = [
        {
            name: "NFT#1",
            description: "Alchemy's First NFT",
            website: "http://axieinfinity.io",
            image: "https://gateway.pinata.cloud/ipfs/QmXgFWYe6ydijYo4zgN118vziD5pzVz9m6hpaFWAgTQv2t",
            price: "0.03ETH",
            currentlySelling: "True",
            address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];

    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);

    async function getAllNFTs() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(
            MarketplaceJSON.address,
            MarketplaceJSON.abi,
            signer
        );
        //create an NFT Token
        let transaction = await contract.getAllNFTs();
        console.log(transaction);

        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(
            transaction.map(async (i) => {
                var tokenURI = await contract.tokenURI(i.tokenId);
                console.log(tokenURI);
                tokenURI = GetIpfsUrlFromPinata(tokenURI);
                console.log(tokenURI);
                let meta = await axios.get(tokenURI);
                meta = meta.data;
                console.log(meta);

                let price = ethers.utils.formatUnits(
                    i.price.toString(),
                    "ether"
                );
                let item = {
                    price,
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    image: meta.image,
                    name: meta.name,
                    description: meta.description,
                };
                return item;
            })
        );

        updateFetched(true);
        console.log(items);
        updateData(items);
    }

    if (!dataFetched) getAllNFTs();

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ paddingTop: "75px" }}>
                    <h1>NFT Cards</h1>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {data.map((value, index) => {
                            return (
                                <Grid
                                    sx={{ maxWidth: 300 }}
                                    xs={2}
                                    sm={4}
                                    md={4}
                                    key={index}
                                >
                                    <NFTTile data={value} key={index}></NFTTile>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Shop;

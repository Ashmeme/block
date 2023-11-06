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
import MarketplaceJSON from "../Marketplace";
import axios from "axios";
import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function Collection() {
    const GetIpfsUrlFromPinata = (pinataUrl) => {
        var IPFSUrl = pinataUrl.split("/");
        const lastIndex = IPFSUrl.length;
        IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
        return IPFSUrl;
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#E4EEFF",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

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

        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(
            transaction.map(async (i) => {
                var tokenURI = await contract.tokenURI(i.tokenId);
                console.log("getting this tokenUri", tokenURI);
                tokenURI = GetIpfsUrlFromPinata(tokenURI);
                let meta = await axios.get(tokenURI);
                meta = meta.data;

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
        updateData(items);
    }

    if (!dataFetched) getAllNFTs();
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ paddingTop: "75px" }}>
                    <h1>My Collection</h1>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {sampleData.map((nft, index) => (
                            <Grid
                                sx={{ maxWidth: 300 }}
                                xs={2}
                                sm={4}
                                md={4}
                                key={index}
                            >
                                <Item>
                                    <Card sx={{ maxWidth: 245 }}>
                                        <CardMedia
                                            sx={{ height: 250 }}
                                            image={nft.image}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {nft.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {nft.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Collection;

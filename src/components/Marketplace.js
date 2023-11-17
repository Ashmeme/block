import NFTTile from "./nftItem";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

export default function Marketplace() {
    const sampleData = [];
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

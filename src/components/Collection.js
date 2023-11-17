import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./nftItem";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Unstable_Grid2";

export default function Profile() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#E4EEFF",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(
            MarketplaceJSON.address,
            MarketplaceJSON.abi,
            signer
        );

        //create an NFT Token
        let transaction = await contract.getMyNFTs();

        /*
         * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
         * and creates an object of information that is to be displayed
         */

        const items = await Promise.all(
            transaction.map(async (i) => {
                const tokenURI = await contract.tokenURI(i.tokenId);
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
                sumPrice += Number(price);
                return item;
            })
        );

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched) getNFTData(tokenId);

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
                        {data.length == 0 ? (
                            <Container sx={{ m: "50px" }}>No data</Container>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Box>
            </Container>
        </div>

        // {data.map((value, index) => {
        //     return <NFTTile data={value} key={index}></NFTTile>;
        // })}
    );
}

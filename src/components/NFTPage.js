import Navbar from "./AppBar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

export default function NFTPage(props) {
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
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
        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        };
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr);
        updateCurrAddress(addr);
    }

    async function buyNFT(tokenId) {
        try {
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
            const salePrice = ethers.utils.parseUnits(data.price, "ether");
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, {
                value: salePrice,
            });
            await transaction.wait();

            alert("You successfully bought the NFT!");
            updateMessage("");
        } catch (e) {
            alert("Upload Error" + e);
        }
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched) getNFTData(tokenId);
    if (typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

    return (
        <div>
            <CssBaseline />
            <Container
                sx={{
                    paddingTop: "75px",
                    paddingBottom: "75px",
                    pl: "55px",
                    border: 1,
                    borderRadius: 6,
                    mt: "75px",
                }}
                maxWidth="xl"
            >
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <img width="400px" src={data.image} alt=""></img>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item sx={{ m: "35px", fontSize: 34 }} xs={6}>
                            <h1 align="center">{data.name}</h1>
                        </Grid>

                        <Grid item sx={{ m: "55px", fontSize: 25 }} xs={6}>
                            <p>{data.description}</p>
                        </Grid>

                        <Grid item xs={6}>
                            Seller:{" "}
                            <span className="text-sm">{data.seller}</span>
                        </Grid>

                        <Grid item sx={{ mt: "55px" }} xs={6}>
                            {currAddress != data.owner &&
                            currAddress != data.seller ? (
                                <div>
                                    <Container>{data.price + " ETH"}</Container>
                                    <button
                                        className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                                        onClick={() => buyNFT(tokenId)}
                                    >
                                        Buy this NFT
                                    </button>
                                </div>
                            ) : (
                                <div className="text-emerald-700">
                                    You are the owner of this NFT
                                </div>
                            )}

                            <div className="text-green text-center mt-3">
                                {message}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

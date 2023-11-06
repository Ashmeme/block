import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";

function AddNFT() {
    const [formParams, updateFormParams] = useState({
        name: "",
        description: "",
        price: "",
    });
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState("");

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS

            updateMessage("Uploading image..");
            const response = await uploadFileToIPFS(file);
            if (response.success === true) {
                updateMessage("");
                console.log("Uploaded image to Pinata: ", response.pinataURL);
                setFileURL(response.pinataURL);
            }
        } catch (e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        //Make sure that none of the fields are empty
        if (!name || !description || !price || !fileURL) {
            updateMessage("Please fill all the fields!");
            return -1;
        }

        const nftJSON = {
            name,
            description,
            price,
            image: fileURL,
        };

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success === true) {
                console.log("Uploaded JSON to Pinata: ", response);
                return response.pinataURL;
            }
        } catch (e) {
            console.log("error uploading JSON metadata:", e);
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL === -1) return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            updateMessage(
                "Uploading NFT(takes 5 mins).. please dont click anything!"
            );

            //Pull the deployed contract instance
            let contract = new ethers.Contract(
                Marketplace.address,
                Marketplace.abi,
                signer
            );

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, "ether");
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, {
                value: listingPrice,
            });
            await transaction.wait();

            alert("Successfully listed your NFT!");

            updateMessage("");
            updateFormParams({ name: "", description: "", price: "" });
        } catch (e) {
            alert("Upload error" + e);
        }
    }

    console.log("Working", process.env);

    return (
        <div>
            <CssBaseline />
            <Container
                sx={{ border: 1, borderRadius: 6, mt: "125px" }}
                maxWidth="xl"
            >
                <Box>
                    <h1 align="center">Add NFT</h1>
                    <Box sx={{ padding: "50px" }}>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}
                        >
                            <TextField
                                align="center"
                                sx={{ mx: "40%", mb: "40px" }}
                                required
                                id="outlined-required"
                                label="Name"
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                align="center"
                                sx={{ mx: "40%", mb: "40px" }}
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={6}
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <Box sx={{ mx: "40%", mb: "40px" }}>
                                <label htmlFor="image">
                                    Upload Image (&lt;500 KB)
                                </label>
                                <input
                                    type={"file"}
                                    onChange={OnChangeFile}
                                ></input>
                            </Box>
                            <TextField
                                align="center"
                                sx={{ mx: "40%", mb: "40px" }}
                                required
                                type="number"
                                id="outlined-required"
                                label="Cost (in ETH)"
                                defaultValue={0.03}
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        price: e.target.price,
                                    })
                                }
                            />
                            <Box sx={{ mx: "40%", mb: "40px" }}>{message}</Box>

                            <Button
                                variant="contained"
                                sx={{ ml: "90%" }}
                                type="submit"
                                onClick={listNFT}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default AddNFT;

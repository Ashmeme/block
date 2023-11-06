import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function MyAppBar() {
    const [connected, toggleConnect] = useState(false);
    const location = useLocation();
    const [currAddress, updateAddress] = useState("0x");
    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
    }

    function updateButton() {
        const ethereumButton = document.querySelector(".enableEthereumButton");
        ethereumButton.textContent = "Connected";
        ethereumButton.classList.remove("hover:bg-blue-70");
        ethereumButton.classList.remove("bg-blue-500");
        ethereumButton.classList.add("hover:bg-green-70");
        ethereumButton.classList.add("bg-green-500");
    }

    async function connectWebsite() {
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });

        if (chainId !== "0xaa36a7") {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }],
            });
        }
        await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(() => {
                updateButton();
                console.log("here");
                getAddress();
            });
    }

    useEffect(() => {
        if (window.ethereum == undefined) return;
        let val = window.ethereum.isConnected();
        if (val) {
            console.log("here");
            getAddress();
            toggleConnect(val);
            updateButton();
        }

        window.ethereum.on("accountsChanged", function (accounts) {
            window.location.replace(location.pathname);
        });
    });

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        href="/"
                        variant="h6"
                        noWrap
                        component="a"
                        // href=""
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        NFT MarketPlace
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            ml: 5,
                        }}
                    >
                        <Button
                            href="marketplace"
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            Marketplace
                        </Button>
                        {connected ? (
                            <Button
                                href="Collection"
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                    m: "10px",
                                }}
                            >
                                Collection
                            </Button>
                        ) : (
                            ""
                        )}
                        <Button
                            href="/"
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            About Us
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            ml: "200px",
                        }}
                    >
                        <Button
                            className="enableEthereumButton"
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                            onClick={connectWebsite}
                        >
                            {connected ? "Connected" : "Connect Wallet"}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            ml: "10px",
                        }}
                    >
                        {currAddress !== "0x"
                            ? "Connected to"
                            : "Not Connected. Please login to view NFTs"}{" "}
                        {currAddress !== "0x"
                            ? currAddress.substring(0, 15) + "..."
                            : ""}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MyAppBar;

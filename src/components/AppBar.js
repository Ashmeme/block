import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
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
            //alert('Incorrect network! Switch your metamask network to Rinkeby');
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
                window.location.replace(location.pathname);
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
                        <Link to="/">NFT MarketPlace</Link>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            ml: 5,
                        }}
                    >
                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            <Link to="/Marketplace">Marketplace</Link>
                        </Button>
                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            <Link to="/profile">Collection</Link>
                        </Button>
                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            <Link to="/SellNft">Sell your NFT</Link>
                        </Button>

                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                m: "10px",
                            }}
                        >
                            <Link to="/">About us</Link>
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
                        ></Button>
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

export default Navbar;

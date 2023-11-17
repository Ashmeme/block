import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellNFT from "./components/SellNFT";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Collection";
import NFTPage from "./components/NFTpage";
import Home from "./components/Home";
import Navbar from "./components/AppBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/sellNFT" element={<SellNFT />} />
                <Route path="/nftPage/:tokenId" element={<NFTPage />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

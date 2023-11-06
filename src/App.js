import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
// import Pages from "./Pages";
// import Cheat from "./NewCheatForm";

import MyAppBar from "./AppBar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import AddNFT from "./components/AddNFT";
import NFTPage from "./components/NFTPage";
// import Shop from "./components/Shop";
import Error from "./components/Error";
import Collection from "./components/Collection";

export default function App() {
    return (
        <Router>
            <MyAppBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="Marketplace" element={<Shop />} />
                <Route path="Collection" element={<Collection />} />
                <Route path="AddNFT" element={<AddNFT />} />
                <Route path="NFT" element={<NFTPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

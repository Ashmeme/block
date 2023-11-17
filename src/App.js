import "./App.css";
import Navbar from "./components/AppBar.js";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Collection.js";
import SellNFT from "./components/SellNFT";
import NFTPage from "./components/NFTpage";
import Home from "./components/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/nftPage" element={<NFTPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sellNFT" element={<SellNFT />} />
            </Routes>
        </div>
    );
}

export default App;

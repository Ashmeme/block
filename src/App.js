import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
// import Pages from "./Pages";
// import Cheat from "./NewCheatForm";

import MyAppBar from "./AppBar";
import Home from "./Home";
import Shop from "./Shop";

export default function App() {
    return (
        <Router>
            <MyAppBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="Marketplace" element={<Shop />} />
                {/* <Route path="sendFuckinghelp" element={<Cheat />}></Route> */}
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

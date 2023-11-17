require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require("fs");
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d`,
            //accounts: [process.env.privateKey]
        },
        matic: {
            url: "https://polygon-mainnet.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d",
            //accounts: [process.env.privateKey]
        },
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/Gu-YqepEMRPCiUrhvSa62yO6vRfYM5ih",
            accounts: [
                "5295d5f41ea4608d61dfde15d974dde9807ce413ee8186d9a1df8b89f2287c48",
            ],
        },
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};

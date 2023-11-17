//require('dotenv').config();
const key = "4b7111e529576360476c";
const secret =
    "9a38a274b06b3b3bfc1210e1c5210edcc2ee8e7d0de9096c6dcc9e87fbfff476";

const axios = require("axios");
const FormData = require("form-data");

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then(function (response) {
            return {
                success: true,
                pinataURL:
                    "https://gateway.pinata.cloud/ipfs/" +
                    response.data.IpfsHash,
            };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            };
        });
};

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️

    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
        name: "testname",
        keyvalues: {
            exampleKey: "exampleValue",
        },
    });
    data.append("pinataMetadata", metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: "FRA1",
                    desiredReplicationCount: 1,
                },
                {
                    id: "NYC1",
                    desiredReplicationCount: 2,
                },
            ],
        },
    });
    data.append("pinataOptions", pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash);
            return {
                success: true,
                pinataURL:
                    "https://gateway.pinata.cloud/ipfs/" +
                    response.data.IpfsHash,
            };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            };
        });
};

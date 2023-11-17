import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function NFTTile(data) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#E4EEFF",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const newTo = {
        pathname: "/nftPage/" + data.data.tokenId,
    };

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
        <Link to={newTo}>
            <Item>
                <Card sx={{ maxWidth: 245 }}>
                    <CardMedia
                        sx={{ height: 260 }}
                        image={IPFSUrl}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.data.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {data.data.description.length > 50
                                ? data.data.description.substring(0, 20) + "..."
                                : data.data.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography
                            sx={{ ml: "5px", mr: "105px" }}
                            variant="body2"
                            color="text.primary"
                        >
                            {data.data.price} ETH
                        </Typography>
                        <Button size="small">About</Button>
                    </CardActions>
                </Card>
            </Item>
        </Link>
    );
}

export default NFTTile;

import { Container, Grid, Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import items from "../data/items.json";
import StoreItem from "../components/StoreItem";
const Store = () => {
  return (
    <Grid container spacing={2} mt={2}>
      {items.map(el=> {
        return <StoreItem {...el}/> 
      })}      
    </Grid>
  );
};

export default Store;

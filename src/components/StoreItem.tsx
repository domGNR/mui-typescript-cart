import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  Fab,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
const StoreItem = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  return (
    <Grid item key={id} xs={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

            <Typography>{formatCurrency(price)}</Typography>

        </CardContent>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Fab size="small" aria-label="remove">
            <RemoveIcon />
          </Fab>
          <Typography>0</Typography>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Stack>
      </Card>
    </Grid>
  );
};

export default StoreItem;

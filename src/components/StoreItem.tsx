import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Fab,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../utilities/formatCurrency";
import { StoreItemsProps } from '../types'
import { useSelector } from 'react-redux'
import { addItemToCart, removeFromCart } from "../reducers/cart-reducer";
import { useAppDispatch,selectCart } from '../store'


const StoreItem = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  const handleAddToCart = () => {
    if(qty>0){
      dispatch(addItemToCart({id,name,price,qty,imgUrl}))
      setQty(0) 
    }else return
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id))
  }
  const handleAdd = () => {
      setQty(qty+1) 
  }
  const handleRemove = () => {
    if(qty>0){
      setQty(qty-1) 
    }
  }

  const cart = useSelector(selectCart)
  const dispatch = useAppDispatch()
  const [qty, setQty] = useState<number>(0)
  return (
    <Grid item key={id} xs={6} md={3}>
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
          <Fab size="small" aria-label="remove" onClick={handleRemove}>
            <RemoveIcon />
          </Fab>
          <Typography>{qty}</Typography>
          <Fab size="small" color="primary" aria-label="add" onClick={handleAdd}
          >
            <AddIcon />
          </Fab>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Button onClick={handleAddToCart}>
            Add
          </Button>
          <Button onClick={handleRemoveFromCart}>
            Remove
          </Button>
          </Stack>
      </Card>
    </Grid>
  );
};

export default StoreItem;

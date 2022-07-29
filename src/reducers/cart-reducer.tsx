import { createSlice,PayloadAction,createAction, isAnyOf, Action,current  } from "@reduxjs/toolkit";
import { CartProduct, CartSliceState,AppDispatch,RootState, AddQty } from "../types";
import {useAppDispatch} from '../store'
import items from '../data/items.json'

const initialState: CartSliceState = {
  total: 0,
  products: [],
};

const isCartAction = (action:Action) => {
  return isAnyOf(addToCart, addQtyToCart, removeFromCart)(action);
};

export const cartSlice = createSlice({
  name: "cart-reducer",
  initialState,
  reducers: {
    addToCart:(state,action:PayloadAction<CartProduct>) => {
      state.products.push(action.payload)
    },
    addQtyToCart:(state,action:PayloadAction<AddQty>) => {
      const {index,qty} = action.payload
      state.products[index].qty += qty
    },
    removeFromCart:(state,action:PayloadAction<Number>) => {
      state.products = state.products.filter(el=>el.id !== action.payload)  
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isCartAction, (state) => {
          state.total = state.products.map(el=> el.price*el.qty).reduce((t,n) => t+n,0)
      })
      .addDefaultCase((state) => {
        return state;
      });
  },  
})

export const addItemToCart = (item:CartProduct) => ( dispatch:AppDispatch,getState:() => RootState) => {
  const {products} = getState().cart
  const {id} = item
  const index = products.findIndex((x) => x.id === id)
  if(index>=0){
   dispatch(addQtyToCart({...item,index}))
  }
  else {
    dispatch(addToCart(item))
  }
}

export const {addToCart,addQtyToCart,removeFromCart} = cartSlice.actions

const { reducer } = cartSlice

export default reducer

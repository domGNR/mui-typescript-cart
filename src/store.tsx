import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart-reducer'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {CartProduct, CartSliceState,RootState,AppDispatch} from './types'



export const store = configureStore({
    reducer: {
      cart: cartReducer,
    }
  })


// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const selectCart = (state: RootState) => state.cart
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export default store

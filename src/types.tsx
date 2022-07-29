import store from "./store"


export type CartSliceState = {
    total: number
    products:CartProduct[]
}

export type StoreItemsProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export type CartProduct = StoreItemsProps & {
    qty:number
}

export type AddQty = CartProduct & {
    index:number
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export type AppDispatch = typeof store.dispatch

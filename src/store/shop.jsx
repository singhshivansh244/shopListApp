import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopList: [],
    shopListToShow: [],
    showModal: false,
    showBy: false,
    showFilterList: false,
    txt: '',
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        showShops(state, action) {
            // console.log("action:", action)
            const filterBy = action.payload.filter
            console.log(filterBy);
            if (filterBy === 'area') {
                state.shopListToShow = state.shopList.filter(list => list.area === action.payload.condition)
            } else if (filterBy === 'category') {
                state.shopListToShow = state.shopList.filter(list => list.category === action.payload.condition)
            } else if (filterBy === 'opening') {
                state.shopListToShow = state.shopList.filter(list => list.opening <= action.payload.condition)
            } else if (filterBy === 'closing') {
                state.shopListToShow = state.shopList.filter(list => list.closing >= action.payload.condition)
            } else {
                state.shopListToShow = state.shopList
            }
            state.showFilterList = true
        },
        showFilterList(state) {
            return {
                ...state,
                showFilterList: !state.showFilterList,
            }
        },
        deleteShop(state, action) {
            console.log(action);
            state.shopList = state.shopList.filter(shop => shop.id !== action.payload.id)
            state.shopListToShow = state.shopListToShow.filter(shop => shop.id !== action.payload.id)
        },
        showBy(state) {
            return {
                ...state,
                showBy: !state.showBy,
            }
        },
        addShop(state, action) {
            const shop = action.payload
            console.log(shop)
            state.shopList.push({
                id: shop.id,
                name: shop.name,
                area: shop.area,
                category: shop.category,
                opening: shop.opening,
                closing: shop.closing,
            })
            state.showModal = !state.showModal
        },
        showModal(state) {
            return {
                ...state,
                showModal: !state.showModal
            }
        },
        setTxt(state, action) {
            state.txt = action.payload.txt
        }
    }
})

export const shopActions = shopSlice.actions

export default shopSlice
import React from 'react';
import {productListAPI, productViewAPI} from "../API/api";

const SET_ITEMS = "SET_ITEMS"
const SELECT_ITEM = "SELECT_ITEM"
const DELETE_PRODUCT = "DELETE_PRODUCT"

let initialState = {
    items: [],
    item: {},
    isFetching: true,
}
export const ProductListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS: {
            return {...state, items: action.items}
        }
        case SELECT_ITEM: {
            return {...state, item: action.item}
        }
        case DELETE_PRODUCT: {
            return {...state, item: state.item.id === action.id ? {} : state.item}
        }
        default:
            return state
    }
};
export const setItems = (items) => ({type: SET_ITEMS, items})
export const deleteSelectedProduct = (id) => ({type: DELETE_PRODUCT, id})

export const selectItem = (item) => ({type: SELECT_ITEM, item})

export const requestProducts = () => {
    return async (dispatch) => {
        const data = await productListAPI.getProducts()
        dispatch(setItems(data))
    }
}
export const addProduct = (body) => async (dispatch) => {
    await productListAPI.addProduct(body)
    const data = await productListAPI.getProducts()
    dispatch(setItems(data))
}
export const deleteProduct = (id) => async (dispatch) => {
    await productListAPI.deleteProduct(id)
    const data = await productListAPI.getProducts()
    dispatch(setItems(data))
    dispatch(deleteSelectedProduct(id))
}
export const addComment = (id, description) => async (dispatch) => {
    const item = await productViewAPI.addComment(id, description)
    const data = await productListAPI.getProducts()
    dispatch(setItems(data))
    dispatch(selectItem(item))
}
export const deleteComment = (id, commentId) => async (dispatch) => {
    const item = await productViewAPI.deleteProduct(id, commentId)
    const data = await productListAPI.getProducts()
    dispatch(setItems(data))
    dispatch(selectItem(item))
}
export const editProduct = (id, body) => async (dispatch) => {
    const item = await productViewAPI.editProduct(id, body)
    const data = await productListAPI.getProducts()
    dispatch(setItems(data))
    dispatch(selectItem(item))
}


export default ProductListReducer
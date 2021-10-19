import * as axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:3002/items`,
    headers: {}
})

export const productListAPI = {
    getProducts() {
        return instance.get('')
            .then(response => {
                return response.data.data
            })
    },
    addProduct(body) {
        return instance.post('', body)
    },
    deleteProduct(id) {
        return instance.delete(`/${id}`)
    }
}
export const productViewAPI = {
    addComment(id, description) {

        return instance.post(`/${id}/comment`, {description})
            .then(response => {
                return response.data.item
            })
    },
    deleteProduct
        (id, commentId) {
        return instance.delete(`/${id}/comment/${commentId}`)
            .then(response => {
                return response.data.item
            })
    },
    editProduct
        (id,body) {
        return instance.post(`/${id}`,{...body})
            .then(response => {
                return response.data.item
            })
    }
}


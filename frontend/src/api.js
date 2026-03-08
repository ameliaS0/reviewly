/*Connection au backend*/

import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

export const compareProducts = (id1, id2) => API.get(`/stats/compare/${id1}/${id2}`)
export const getProducts = () => API.get('/products/')
export const getGlobalStats = () => API.get('/stats/global')

export const createProduct = (formData) =>
  API.post('/products/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const deleteProduct = (id) => API.delete(`/products/${id}`)

export const getReviews = (productId) => API.get(`/reviews/${productId}`)
export const createReview = (productId, data) => API.post(`/reviews/${productId}`, data)
export const deleteReview = (id) => API.delete(`/reviews/delete/${id}`)
export const getStats = (productId) => API.get(`/stats/${productId}`)
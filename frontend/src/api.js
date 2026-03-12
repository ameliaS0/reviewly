/*Connection au backend*/

import axios from 'axios'

/*on crée une instance axios configurée avec l'URL de base du backend Flask
tous les appels faits via 'API' auront automatiquement ce préfixe
donc API.get('/products/') appellera http://localhost:5000/api/products/

l'avantage d'une instance centralisée c'est que si l'URL du backend change
on la modifie ici une seule fois au lieu de la changer dans chaque composant*/
const API = axios.create({ baseURL: 'http://localhost:5000/api' })

/*GET /api/stats/global*/
export const getGlobalStats = () => API.get('/stats/global')

/*nouv produit avec une image possible (FormData)
'multipart/form-data' est obligatoire pour envoyer des fichiers 
POST /api/products/*/
export const createProduct = (formData) =>
  API.post('/products/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

/*mettre a jour
PUT /api/products/:id */
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

/*sup produits
DELETE /api/products/:id */
export const deleteProduct = (id) => API.delete(`/products/${id}`)

/*GET /api/reviews/:productId */
export const getReviews = (productId) => API.get(`/reviews/${productId}`)

/*data -> la note envoyer
POST /api/reviews/:productId*/
export const createReview = (productId, data) => API.post(`/reviews/${productId}`, data)

/*sup un avis par son id
l'URL utilise /delete/ pour éviter un conflit avec getReviews
qui utilise aussi un id numérique (sinon Flask ne saurait pas distinguer les deux)
DELETE /api/reviews/delete/:id*/
export const deleteReview = (id) => API.delete(`/reviews/delete/${id}`)

/*GET /api/stats/:productId */
export const getStats = (productId) => API.get(`/stats/${productId}`)

/*GET /api/products/*/
export const getProducts = () => API.get('/products/')

/*compare les statistiques de deux produits
les deux ids sont passés directement dans l'URL
GET /api/stats/compare/:id1/:id2*/
export const compareProducts = (id1, id2) => API.get(`/stats/compare/${id1}/${id2}`)

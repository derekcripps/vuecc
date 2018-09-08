import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000/main',
  json: true
})

export default {
  async execute (method, resource, data, errorData) {
    // inject the accessToken for each request
    let accessToken = localStorage.getItem('id_token')
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Token ${accessToken}`
      }, 
      errorData
    }).then(req => {
      return req.data
    })
    .catch(error => {
        return error;
    })
  },
  listCompany () {
    return this.execute('get', '/company/')
  },
  getCompany (id) {
    return this.execute('get', `/company/${id}/`)
  },
  createCompany (data) {
    return this.execute('post', '/company/', data)
  },
  updateCompany (id, data) {
    return this.execute('put', `/company/${id}/`, data)
  },
  deleteCompany (id) {
    return this.execute('delete', `/company/${id}/`)
  }
}
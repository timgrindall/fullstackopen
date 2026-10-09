import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newEntry) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newEntry, config)
  return response.data
}

const update = async (id, updatedEntry) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedEntry)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, getOne, remove }
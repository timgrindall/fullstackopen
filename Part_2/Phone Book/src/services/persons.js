import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = newPerson => {
    return axios.post(baseURL, newPerson)
}

const deletePerson = id => {
    return axios.delete(baseURL + "/" + id)
}

const replace = (newPerson, id) => {
    return axios.put(baseURL + "/" + id, newPerson)
}

export default {
    getAll,
    create,
    deletePerson,
    replace
}
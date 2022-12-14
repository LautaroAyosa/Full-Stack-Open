import axios from 'axios'

const baseUrl = '/api/persons/'

const getAll = () => {
    return axios
        .get(baseUrl)
        .catch(error => {
            console.log(error)
        })
}

const createPerson = (name, number) => {
    return axios
        .post(baseUrl, { name: name, number: number })
        .catch(error => {
            console.log(error)
        })
}

const deletePerson = (id) => {
    return axios
        .delete(baseUrl + id)
        .catch(error => {
            console.log(error)
        })
}

const updatePerson = (id, name, number) => {
    return axios
        .put(baseUrl + id, {name: name, number: number} )
}


export default { getAll, createPerson, deletePerson, updatePerson }
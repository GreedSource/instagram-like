// ####################################################################################################################################
import axios from 'axios'

// ####################################################################################################################################
//const url = 'http://localhost:3700/api/auth/'
const url = '/api/user/'

// ####################################################################################################################################
export {
    fetchData,
    unfollowUser,
    followUser, 
    updateUser,
    fetchUsers
}

// ####################################################################################################################################

async function fetchData(_id){
    const data = await axios.get(`${url}${_id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data;
    })
    return data
}

async function followUser(followId) {
    const data = await axios.put(`${url}follow`, { followId } ,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data;
    })
    return data
}

async function unfollowUser(unfollowId) {
    const data = await axios.put(`${url}unfollow`, { unfollowId } ,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data;
    })
    return data
}

async function updateUser(formData){
    const data = await axios.put(`${url}update`, formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data;
    })
    return data
}

async function fetchUsers(formData){
    const data = await axios.post(`${url}search-users`, formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data;
    })
    return data
}

// ####################################################################################################################################
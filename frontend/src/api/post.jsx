// ####################################################################################################################################
import axios from 'axios'

// ####################################################################################################################################
   //const url = 'http://localhost:3700/api/auth/'
   const url = '/api/post/'

// ####################################################################################################################################
   export {
      fetchData,
      fetchPhoto,
      insertData,
      likePost,
      unlikePost,
      commentPost,
      deletePost,
      fetchPosts
   }

// ####################################################################################################################################

   async function fetchData(){
      const data = await axios.get(`${url}`, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
      })
      .then((response) => {
         return response.data.posts
      })
      .catch((error) => {
         return error.response.data
      })
      return data
   }

   async function fetchPosts(){
      const data = await axios.get(`${url}mypost`, {
         headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
      }).then((response) => {
         return response.data.posts
      })
      .catch((error) => {
         return error.response.data
      })
      return data
  }

   async function insertData(form){ // ===============================================================================
      const data = await axios.post(`${url}createpost`, form, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
      })
      .then((response) => {
         return response.data 
      })
      .catch((error) => {
         return error.response.data
      })
      return data
   }

   async function fetchPhoto (api_info) {
      const data = await axios.post('https://api.cloudinary.com/v1_1/greedsource/image/upload', api_info, {
         headers: { 
            'Content-Type': 'multipart/form-data',
         }
      })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
      return data
   }

   async function likePost(_id){
      const data = await axios.put(`${url}like`, {postId: _id}, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
     })
     .then((response) => {
         return response.data
     })
     .catch((error) => {
         return error.response.data
     })
     return data
   }

   async function unlikePost(_id){
      const data = await axios.put(`${url}unlike`, {postId: _id}, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
     })
     .then((response) => {
         return response.data
     })
     .catch((error) => {
         return error.response.data
     })
     return data
   }

   async function commentPost(postId, text) {
      const data = await axios.put(`${url}comment`, { postId, text }, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
      })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
      return data
   }

   async function deletePost(postId) {
      const data = await axios.delete(`${url}deletepost/${postId}`, {
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         }
      })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
      return data
   }

// ####################################################################################################################################
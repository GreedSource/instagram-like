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
       try {
           const { data } = await axios.post('https://api.cloudinary.com/v1_1/greedsource/image/upload', api_info, {
               headers: { 
                   'Content-Type': 'multipart/form-data',
                }
           })
           return data
       }
       catch (error) {
           console.log(error)
       }
   }

   async function likePost(_id){
      try {
         const { data } = await axios.put(`${url}like`, {postId: _id}, {
             headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
             }
         })
         return data
      } catch (error) {
         console.log(error)
      }
   }

   async function unlikePost(_id){
      try {
         const { data } = await axios.put(`${url}unlike`, {postId: _id}, {
             headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
             }
         })
         return data
      } catch (error) {
         console.log(error)
      }
   }

   async function commentPost(text, postId) {
      try {
         const { data } = await axios.put(`${url}comment`, { text, postId }, {
             headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
             }
         })
         return data
      } catch (error) {
         console.log(error)
      }
   }

   async function deletePost(postId) {
      try {
         const { data } = await axios.delete(`${url}deletepost/${postId}`, {
             headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
             }
         })
         return data
      } catch (error) {
         console.log(error)
      }
   }

// ####################################################################################################################################
// ####################################################################################################################################
import axios from 'axios'

// ####################################################################################################################################
   //const url = 'http://localhost:3700/api/auth/'
   const url = '/api/auth/'

// ####################################################################################################################################
   export {
      handleSignup,
      handleSignin
   }

// ####################################################################################################################################

   async function handleSignup(form){ // ===============================================================================
      const data = await axios.post(`${url}signup`, form)
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
      return data;
   }

   async function handleSignin(form) {
      const data = await axios.post(`${url}signin`, form)
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
      return data;
   }

// ####################################################################################################################################
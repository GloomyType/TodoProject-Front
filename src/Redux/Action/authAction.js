import axios from 'axios'

const token = localStorage.getItem('token')

const axiosToken = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const login = (info) => async () => {
  try {
    const response = await axios.post("/auth/login", info)
    if(response.status === 200){
      localStorage.setItem("token",response.data.accessToken)
      localStorage.setItem("id",response.data.tokenExpiresIn)
      return { success: true }
    }
  } catch (error) {
      return { success: false }
  }
}

export const signup = (info) => async () => {
  try {
    const response = await axios.post("/auth/signup", info)
    if(response.status === 200){
      return { success: true }
    }
  } catch (error) {
      return { success: false }
  }
}

export const deleteMember = (info) => async () => {
  try {
    const response = await axiosToken.delete("/auth/withdrawal", { data : info } )
    if(response.status === 200){
      return { success: true }
    }
  } catch (error) {
      return { success: false }
  }
}

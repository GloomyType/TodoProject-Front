import axios from 'axios'

const token = localStorage.getItem('token')

const axiosToken = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const getTodoList = () => async () => {
  try {
    const response = await axiosToken.get("/todo/")
    if(response.status === 200){
      return { 
        success: true , data : response.data 
      }
    }
  } catch (error) {
      return { 
        success: false , data : undefined
      }
  }
}

export const postTodo = (contents) => async () => {
  try {
    const response = await axiosToken.post("/todo/", {contents : contents , status: '할 일'})
    if(response.status === 200){
      return { 
        success: true , data : response.data 
      }
    }
  } catch (error) {
      return { 
        success: false , data : undefined
      }
  }
}

export const updateTodoStatus = (info) => async () => {
  try {
    const response = await axiosToken.put("/todo/", info)
    if(response.status === 200){
      return { 
        success: true , data : response.data 
      }
    }
  } catch (error) {
      return { 
        success: false , data : undefined
      }
  }
}

export const getTodoOne = () => async () => {
  try {
    const response = await axiosToken.get("/todo/latest")
    if(response.status === 200){
      return { 
        success: true , data : response.data 
      }
    }
  } catch (error) {
      return { 
        success: false , data : undefined
      }
  }
}
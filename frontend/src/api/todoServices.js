import axios from "axios"

export const getTask = async () => {
  const res = await axios.get("/list")
  return res.data
}

export const createTask = async (taskData) => {
  const res = await axios.post("/create", taskData)
  console.log("Create Task",res);
  
  return res.data
}

export const updateTask = async (id, data) => {
  const res = await axios.put(`/update/${id}`, data)
  return res.data
}

export const deleteTask = async (id) => {
  const res = await axios.delete(`/delete/${id}`)
  return res.data
}
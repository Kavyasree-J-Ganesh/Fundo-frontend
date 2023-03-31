import axios from "axios"

const headerConfig = {headers:{Authorization: `bearer ${localStorage.getItem("auth")}`}}

export const createNote = async (data) => {
    const result = await axios.post("http://localhost:4000/api/v1/note", data, headerConfig)
    return result
}

export const getNotes = async () => {
    const result = await axios.get("http://localhost:4000/api/v1/note", headerConfig)
    return result
}

export const updateColor = async (id, color) => {
    const result = await axios.put(`http://localhost:4000/api/v1/note/${id}`,{"color": color}, headerConfig)
    return result
}


export const addToArchive = async (id) => {
    const result = await axios.put(`http://localhost:4000/api/v1/note/${id}/addToArchive`,{}, headerConfig)
    return result
}

export const addToTrash = async (id) => {
    const result = await axios.put(`http://localhost:4000/api/v1/note/${id}/addToTrash`,{}, headerConfig)
    return result
}

export const updateNote = async (data,id) => {
    const result = await axios.put(`http://localhost:4000/api/v1/note/${id}`,data, headerConfig)
    return result
}


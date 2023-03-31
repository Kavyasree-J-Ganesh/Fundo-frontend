import axios from "axios"

const signin = async (data) => {
    const result = await axios.post("http://localhost:4000/api/v1/users/login", data)
    return result
}

const signup = async (data) => {
    const result = await axios.post("http://localhost:4000/api/v1/users/signup", data)
    return result
}



export {signin, signup}
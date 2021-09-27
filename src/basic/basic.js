import axios from "axios"
//import qs from 'querystring'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

const setCookie = (name, value, option) => {
    return cookies.set(name, value, {...option})
}
const getCookie = (name) => {
    return cookies.get(name)
}

const axiosConfig = {
    baseURL : 'http://localhost:8080/api'
    /*
    ,headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${getCookie('response')}`
    }
    */
    
}

const get = (path) => {
    return axios.create(axiosConfig).get(path,{withCredentials: true})
}

const ping = () => {
    get('/ping')
        .then(console.log)
        .catch(console.error)
        .finally(console.log)
}

const auth = () => {
    console.log(getCookie('auth'))
    get('/auth/token')
        .then(token => {
            //console.log(token)
            setCookie('auth', token.request.responseText)
        })
        .catch(console.error)
        .finally(console.log)
}

const response = () => {
    get('/auth/response')
        .then(rv => {
            console.log(rv)
            //console.log(process.env)
        })
        .catch(console.log)
}

export {ping, auth, response}
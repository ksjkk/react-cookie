import axios from "axios"
import moment from "moment"
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
const post = (path, data) => {
    return axios.create(axiosConfig).post(path, data)
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
            console.log(getCookie('auth'))
        })
        .catch(console.log)
}

const dateCheck = () => {
    let now = moment().locale('ko')
    let param = {
        'localDateTime' : now.toISOString(),
        'zonedDateTime' : now.toISOString()
    }
    console.log(param)
    post('/log-date-type', param)
        .then()
        .catch()
}

export {ping, auth, response, dateCheck}
import axios from 'axios/dist/axios'
import { encode } from 'js-base64'

const awsAxios = axios.create({
    baseURL: 'https://d5qagbf3r9.execute-api.us-east-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encode('test_demo' + ':' + 'pass1234')
    }
})

export default awsAxios

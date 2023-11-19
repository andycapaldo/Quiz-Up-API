import axios from 'axios';
import APIResponse from '../types/api';
import UserType from '../types/auth';



const base: string = 'https://cae-bookstore.herokuapp.com/'
const userEndpoint: string = '/user'
const loginEndpoint: string = '/login'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)

const apiClientBasicAuth = (email: string, password:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Basic ' + btoa(`${email}:${password}`)
        }
    }
)

const apiClientTokenAuth = (token:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
)

async function createNewUser(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function login(email: string, password: string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function editProfile(token:string, editedUserData:{ email: string }): Promise<APIResponse<{success:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint + '/', editedUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function deleteProfile(token:string): Promise<APIResponse<{success:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


export {
    createNewUser,
    login,
    editProfile,
    deleteProfile
}
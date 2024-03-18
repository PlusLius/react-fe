import axios, { ResDataType } from './ajax'

export async function getUserInfoService():Promise<ResDataType> {
    const url = '/api/user/info'
    const data = (await axios.get(url)) as ResDataType
    return data   
}

export async function getRegisterService(username:string, password: string, nickname?: string):Promise<ResDataType> {
    const url = '/api/user/register'
    const body = {username, password, nickname:nickname || username}
    const data = (await axios.post(url, body)) as ResDataType
    return data   
}

export async function loginService(username:string, password: string):Promise<ResDataType> {
    const url = '/api/user/login'
    const body = {username, password}
    const data = (await axios.post(url, body)) as ResDataType
    return data   
}
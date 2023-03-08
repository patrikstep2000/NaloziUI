import axios from "axios";


class DBConnector {
    public static baseURL = process.env.NEXT_PUBLIC_BASE_URL_MAIN_DB;
    constructor() {
    }
    public static get= async (link:string)=>{
        return await axios.get(`${this.baseURL}${link}`);
    }
    public static post = async (link:string, data:any)=>{
        return await axios.post(`${this.baseURL}${link}`, data)
    }
    public static patch = async (link:string, data:any, id:string)=>{
        return await axios.patch(`${this.baseURL}${link}/${id}`, data)
    }
}

export {DBConnector}
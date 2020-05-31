
import axios from 'axios';
const url = "http://localhost:3333";

export default function connection() {
    const instance = axios.create({
        baseURL: url + '',
        timeout: 100000,
    });
    return instance;
}
export function connectionWithToken() {
    let token = localStorage.getItem('token')
    if (token) {
        const instance = axios.create({
            baseURL: url + '',
            timeout: 100000,
            headers: { 'authorization': 'bearer ' + token }
        });
        return instance;
    }
}
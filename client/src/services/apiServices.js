import axios from "axios";



axios.defaults.withCredentials = true

const apiUrl = "http://localhost:3000/api";




export function registerUser(body) {
  return axios.post(apiUrl + "/auth/register", body);
}

export function loginUser(body) {
  return axios.post(apiUrl + "/auth/login", body);
}

export function refreshToken() {
  return axios.post(apiUrl + "/refresh", {
    withCredentials: true, 
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
  });
}

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export function createTransaction(transaction, token) {
  return axios.post(apiUrl + "/transactions", transaction, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTransactions(token) {  
  return axios.get(apiUrl + "/transactions");
}

export function getLatest(token) {
  return axios.get(apiUrl + "/transactions/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export function update(id, transaction, token) {
    return axios.put(apiUrl + "/transactions/" + id, transaction, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export function deleteT(id,token) {
    return axios.delete(apiUrl + "/transactions/" + id,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

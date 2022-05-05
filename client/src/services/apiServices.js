import axios from "axios";
const apiUrl = "http://localhost:3000/api";

export function registerUser(body) {
  return axios.post(apiUrl + "/auth/register", body);
}

export function loginUser(body) {
  return axios.post(apiUrl + "/auth/login", body);
}

export function getCategories() {
  return axios.get(apiUrl + "/categories");
}

export function createTrasaction(transaction, token) {
  return axios.post(apiUrl + "/transactions", transaction, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTransactions(token) {
  return axios.get(apiUrl + "/Transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

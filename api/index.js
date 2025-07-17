import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com"

export const fetchUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);

  const users = res.data;
  return users;
};

export const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/users/${id}`)

    const deleteMessage = `Status: ${res.status}. Message: ${res.statusText}`;
    return deleteMessage;
}

export const updateUser = async (id, updates) => {
    const res = await axios.put(`${API_URL}/users/${id}`, updates, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const userInfo = res.data;
    return userInfo;
}

export const createUser = async (user) => {
    const res = await axios.post(`${API_URL}/users`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return res.data;
}
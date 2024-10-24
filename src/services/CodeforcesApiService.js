import axios from 'axios'

const BASE_URL = 'https://codeforces.com/api'


const getCodeforcesClient = (endpoint, params) => {
    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: endpoint,
        params: params,
    })
}

export const getUserInfo = async (usernames) => {
    const response = await getCodeforcesClient('/user.info', {
        handles: usernames.join(';')
    })
    if (response.status === 200) {
        return response.data.result;
    }
    return [];
}

export const getUserSubmissions = async (username) => {
    const response = await getCodeforcesClient('/user.status', {
        handle: username,
    })
    if (response.status === 200) {
        return response.data.result;
    }
    return [];
}

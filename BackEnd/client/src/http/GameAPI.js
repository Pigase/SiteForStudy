import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createDeveloper = async (developer) => {
    const {data} = await $authHost.post('api/developer', developer)
    return data
}

export const fetchDevelopers = async () => {
    const {data} = await $host.get('api/developer',)
    return data
}

export const createGame = async (game) => {
    const {data} = await $authHost.post('api/game', game)
    return data
}

export const fetchGames = async (typeId, developerId, page, limit = 5) => {
    const {data} = await $host.get('api/game', {params: {
        typeId, developerId, page, limit
    }})
    return data
}

export const fetchOneGame = async (id) => {
    const {data} = await $host.get('api/game/' + id)
    return data
}
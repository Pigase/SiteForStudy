import {makeAutoObservable} from "mobx";

export default class GameStore 
{
    constructor() 
    {
        this._types =
        [
            {id: 1, name: 'Шутер'},
            {id: 2, name: 'Аркада'}
        ]
        this._developers =
        [
            {id: 1, name: 'Pigas'},
            {id: 2, name: 'Frol'}
        ]
        this._games =
        [
            {id: 1, name: "FlappyBird", price: 5, rating: 3, img: "https://yandex.by/images/search?from=tabbar&img_url=https%3A%2F%2Fclipartflare.com%2Fimages%2Ffl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png&lr=153&pos=6&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B%20300%20%D0%BD%D0%B0%20300%20%D0%B0%D0%B4%D1%84%D0%B7%D0%B7%D0%BD"},
            {id: 2, name: "FlappyBird", price: 5, rating: 3, img: "https://yandex.by/images/search?from=tabbar&img_url=https%3A%2F%2Fclipartflare.com%2Fimages%2Ffl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png&lr=153&pos=6&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B%20300%20%D0%BD%D0%B0%20300%20%D0%B0%D0%B4%D1%84%D0%B7%D0%B7%D0%BD"},
            {id: 3, name: "FlappyBird", price: 5, rating: 3, img: "https://yandex.by/images/search?from=tabbar&img_url=https%3A%2F%2Fclipartflare.com%2Fimages%2Ffl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png&lr=153&pos=6&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B%20300%20%D0%BD%D0%B0%20300%20%D0%B0%D0%B4%D1%84%D0%B7%D0%B7%D0%BD"},
            {id: 4, name: "FlappyBird", price: 5, rating: 3, img: "https://yandex.by/images/search?from=tabbar&img_url=https%3A%2F%2Fclipartflare.com%2Fimages%2Ffl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png&lr=153&pos=6&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B%20300%20%D0%BD%D0%B0%20300%20%D0%B0%D0%B4%D1%84%D0%B7%D0%B7%D0%BD"},
            {id: 5, name: "FlappyBird", price: 5, rating: 3, img: "https://yandex.by/images/search?from=tabbar&img_url=https%3A%2F%2Fclipartflare.com%2Fimages%2Ffl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png&lr=153&pos=6&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B%20300%20%D0%BD%D0%B0%20300%20%D0%B0%D0%B4%D1%84%D0%B7%D0%B7%D0%BD"}
        ]   
        makeAutoObservable(this)
    }

    setTypes(types)
    {
        this._types = types
    }

    setDevelopers(developers)
    {
        this._developers = developers
    }

    setGames(games)
    {
        this._games = games
    }

    get types()
    {
        return this._types
    }

    get developers()
    {
        return this._developers
    }

    get games()
    {
        return this._games
    }
}
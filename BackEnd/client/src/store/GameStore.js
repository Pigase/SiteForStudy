import {makeAutoObservable} from "mobx";

export default class GameStore 
{
    constructor() 
    {
        this._types =
        [
            {id: 1, name: 'Аркада'},
            {id: 2, name: 'Шутер'},
            {id: 3, name: 'Головоломка'},
            {id: 4, name: 'Хоррор'}
        ]
        this._developers =
        [
            {id: 1, name: 'Pigas'},
            {id: 2, name: 'Frol'},
            {id: 3, name: 'Blizzard'},
            {id: 4, name: 'WarGaming'}
        ]
        this._games =
        [
            {id: 1, name: "FlappyBird", price: 5, rating: 3, img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"},
            {id: 2, name: "FlappyBird", price: 5, rating: 3, img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"},
            {id: 3, name: "FlappyBird", price: 5, rating: 3, img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"},
            {id: 4, name: "FlappyBird", price: 5, rating: 3, img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"},
            {id: 5, name: "FlappyBird", price: 5, rating: 3, img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"}
        ]   
        this._selectedType = {}
        this._selectedDeveloper = {}
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

    setSelectedType(type)
    {
        this._selectedType = type
    }

    setSelectedDeveloper(developer)
    {
        this._selectedDeveloper = developer
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

    get selectedType()
    {
        return this._selectedType
    }

    get selectedDeveloper()
    {
        return this._selectedDeveloper
    }
}
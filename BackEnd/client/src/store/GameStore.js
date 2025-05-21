import {makeAutoObservable} from "mobx";

export default class GameStore 
{
    constructor() 
    {
        this._types = []

        this._developers = []

        this._games = []

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
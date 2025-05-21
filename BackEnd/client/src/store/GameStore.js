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

        this._page = 1
        this._totalCount = 0
        this._limit = 3
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
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedDeveloper(developer)
    {
        this.setPage(1)
        this._selectedDeveloper = developer
    }

    setPage(page) 
    {
        this._page = page
    }

    setTotalCount(count)
    {
        this._totalCount = count
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

    get totalCount() 
    {
        return this._totalCount
    }

    get page() 
    {
        return this._page
    }

    get limit() 
    {
        return this._limit
    }
}
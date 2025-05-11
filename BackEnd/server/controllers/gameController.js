const uuid = require('uuid')
const path = require('path');
const {Game} = require('../models/models')
const ApiError = require('../error/ApiError');

class GameController{
    async create(req,res,next){
        try
        {
        const {name, price, developerId, typeId, info} = req.body
        const {img} =req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const game = await Game.create({name, price, developerId, typeId, img: fileName})

        return res.json(game)
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){

    }

    async getOne(req,res){

    }

}

module.exports = new GameController()
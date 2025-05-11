const sequelize = require('../db')
const{DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true,},//не понятно
    password:{type: DataTypes.STRING},
    role:{type: DataTypes.STRING,defaultValue: "User"},
})

const Basket = sequelize.define('basket',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketGame = sequelize.define('basket_game',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Game = sequelize.define('game',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING,unique: true, allowNull: false},
    price:{type: DataTypes.INTEGER, allowNull: false},
    rating:{type: DataTypes.INTEGER, defaultValue: 0},
    img:{type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Developer = sequelize.define('developer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const GameInfo = sequelize.define('game_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeDeveloper = sequelize.define('type_developer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketGame)
BasketGame.belongsTo(Basket)

Type.hasMany(Game)
Game.belongsTo(Type)

Developer.hasMany(Game)
Game.belongsTo(Developer)

Game.hasMany(Rating)
Rating.belongsTo(Game)

Game.hasMany(BasketGame)
BasketGame.belongsTo(Game)

Game.hasMany(GameInfo, {as: 'info'});
GameInfo.belongsTo(Game)

Type.belongsToMany(Developer, {through: TypeDeveloper })
Developer.belongsToMany(Type, {through: TypeDeveloper })

module.exports = {
    User,
    Basket,
    BasketGame,
    Game,
    Type,
    Developer,
    Rating,
    TypeDeveloper,
    GameInfo
}
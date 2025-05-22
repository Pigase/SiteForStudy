const { Basket, BasketGame, Game } = require('../models/models');


class BasketController {
    async addToBasket(req, res) {
        const { gameId } = req.body;
        const userId = req.user.id;
    
        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }
    
      
        const existingBasketGame = await BasketGame.findOne({ where: { basketId: basket.id, gameId } });
    
        if (existingBasketGame) {
            return res.status(400).json({ message: "Этот ПК уже добавлен в корзину!" });
        }

        const BasketGame = await BasketGame.create({
            basketId: basket.id,
            gameId,
        });
    
        return res.json(BasketGame);
    }
    

    async getBasket(req, res) {
        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: { userId },
            include: {
                model: BasketGame,
                include: [Game],
            },
        });

        return res.json(basket);
    }

    async removeFromBasket(req, res) {
        const { basketGameId } = req.params;
        await BasketGame.destroy({ where: { id: basketGameId } });
        return res.json({ message: 'Удалено из корзины' });
    }
}

module.exports = new BasketController();
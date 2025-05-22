const { Basket, BasketGame, Game } = require('../models/models');

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const { gameId } = req.body;
            const userId = req.user.id;

            // Находим или создаем корзину пользователя
            let basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                basket = await Basket.create({ userId });
            }

            // Проверяем, есть ли уже игра в корзине
            const existingItem = await BasketGame.findOne({ 
                where: { 
                    basketId: basket.id, 
                    gameId 
                } 
            });

            if (existingItem) {
                return res.status(400).json({ message: "Игра уже в корзине" });
            }

            // Добавляем игру в корзину
            const basketItem = await BasketGame.create({
                basketId: basket.id,
                gameId
            });

            return res.json(basketItem);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: BasketGame,
                    include: [Game]
                }]
            });
            return res.json(basket || { basket_games: [] });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeFromBasket(req, res) {
        const { basketGameId } = req.params;
        await BasketGame.destroy({ where: { id: basketGameId } });
        return res.json({ message: 'Удалено из корзины' });
    }
}

module.exports = new BasketController();
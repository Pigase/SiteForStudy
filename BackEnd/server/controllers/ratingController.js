const { Rating, Game } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
    async setRating(req, res, next) {
        try {
            const { gameId, rate } = req.body;
            const userId = req.user.id;

            let rating = await Rating.findOne({ where: { userId, gameId } });

            if (rating) {
                rating.rate = rate;
                await rating.save();
            } else {
                rating = await Rating.create({ userId, gameId, rate });
            }

            // Пересчет среднего рейтинга
            const ratings = await Rating.findAll({ where: { gameId } });
            const total = ratings.reduce((sum, item) => sum + item.rate, 0);
            const average = Math.round(total / ratings.length);

            await Game.update({ rating: average }, { where: { id: gameId } });

            return res.json(rating);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkUserRating(req, res, next) {
        try {
            const { gameId } = req.query;
            const userId = req.user.id;

            const rating = await Rating.findOne({
                where: { userId, gameId },
                attributes: ['rate']
            });

            return res.json(rating || { rate: 0 });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RatingController();
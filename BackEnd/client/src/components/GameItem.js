// GameItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import '../styles/GameItem.css';

const GameItem = observer(({ game }) => { 
    const history = useNavigate();
    const { game: gameStore } = React.useContext(Context);
    
    const gameType = gameStore.types.find(type => type.id === game.typeId);
    
    return (
        <div className="game-item" onClick={() => history(GAME_ROUTE + '/' + game.id)}>
            <div className="game-image-container">
                <img
                    className="game-image"
                    src={process.env.REACT_APP_API_URL + game.img}
                    alt={game.name}
                />
                <div className="game-rating">
                    <span className="rating-value">{game.rating}</span>
                    <span className="rating-icon">★</span>
                </div>
            </div>
            
            <div className="game-info">
                <h4 className="game-title">{game.name}</h4>
                <span className="game-type">{gameType?.name || 'Не указан'}</span>
                <div className="game-price">{game.price} $</div>
            </div>
        </div>
    );
});

export default GameItem;
// GameList.js
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import GameItem from './GameItem';
import '../styles/GameList.css';

const GameList = observer(() => { 
    const { game } = useContext(Context);
    
  return (
    <div className="game-list">
      {game.games.map(game =>
         <GameItem key={game.id} game={game}/>
      )}
    </div>
  );
})

export default GameList;
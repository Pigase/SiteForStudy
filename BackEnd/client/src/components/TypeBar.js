// TypeBar.js
import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite'
import {Context} from "../index"
import '../styles/TypeBar.css';

const TypeBar = observer(() => { 
    const {game} = useContext(Context)
  return (
    <div className="type-bar">
      {game.types.map(type =>
        <div 
            className={`type-item ${type.id === game.selectedType.id ? 'active' : ''}`}
            onClick={() => game.setSelectedType(type)}
            key={type.id}
        >
            {type.name}
            {type.id === game.selectedType.id && <span className="active-indicator"></span>}
        </div>
      )}
    </div>
  );
})

export default TypeBar;
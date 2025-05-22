// DeveloperBar.js
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import '../styles/DeveloperBar.css';

const DeveloperBar = observer(() => { 
    const { game } = useContext(Context);

    return (
        <div className="developer-bar">
            {game.developers.map(developer => (
                <div
                   className={`developer-item ${developer.id === game.selectedDeveloper.id ? 'active' : ''}`}
                   key={developer.id}
                   onClick={() => game.setSelectedDeveloper(developer)}
                >
                    {developer.name}
                </div>
            ))}
        </div>
    );
});

export default DeveloperBar;
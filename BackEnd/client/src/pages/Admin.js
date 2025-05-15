import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateDeveloper from '../components/modals/CreateDeveloper';
import CreateGame from '../components/modals/CreateGame';
import CreateType from '../components/modals/CreateType';

const Admin = () => { 
  const [developerVisible, setDeveloperVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [gameVisible, setGameVisible] = useState(false)
  return (
    <Container className="d-flex flex-column">
       <Button 
       variant={"outline-dark"} 
       className="mt-2"
       onClick={() => setTypeVisible(true)}
       >
           Добавить тип
        </Button>
       <Button 
       variant={"outline-dark"} 
       className="mt-2"
       onClick={() => setDeveloperVisible(true)}
       >
           Добавить Разработчика
       </Button>
       <Button 
       variant={"outline-dark"} 
       className="mt-2"
       onClick={() => setGameVisible(true)}
       >
            Добавить игру
       </Button>
       <CreateDeveloper show = {developerVisible} onHide={() => setDeveloperVisible(false)}/>
       <CreateGame show = {gameVisible} onHide={() => setGameVisible(false)}/>
       <CreateType show = {typeVisible} onHide={() => setTypeVisible(false)}/>
    </Container>
  );
}

export default Admin;

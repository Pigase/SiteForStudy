import React, { useContext, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import TypeBar from '../components/TypeBar';
import DeveloperBar from '../components/DeveloperBar';
import GameList from '../components/GameList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchDevelopers, fetchGames, fetchTypes } from '../http/GameAPI';

const Shop = observer(() => { 
  const {game} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => game.setTypes(data))
    fetchDevelopers().then(data => game.setDevelopers(data))
    fetchGames().then(data => game.setGames(data.rows))
  }, [])
  return (
    <Container >
      <Row className="mt-3">
        <Col md= {2}>
            <TypeBar/>
        </Col>
        <Col md= {10}>
            <DeveloperBar/>
            <GameList/>
        </Col>
      </Row>
    </Container>
  );
})

export default Shop;

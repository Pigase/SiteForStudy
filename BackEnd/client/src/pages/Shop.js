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
import Pages from '../components/Pages';

const Shop = observer(() => { 
  const {game} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => game.setTypes(data))
    fetchDevelopers().then(data => game.setDevelopers(data))
    fetchGames(null, null, 1, 3).then(data => {
      game.setGames(data.rows)
      game.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchGames(game.selectedType.id, game.selectedDeveloper.id, game.page, 3).then(data => {
      game.setGames(data.rows)
      game.setTotalCount(data.count)
    })
  }, [game.page, game.selectedType, game.selectedDeveloper])
  
  return (
    <Container >
      <Row className="mt-3">
        <Col md= {2}>
            <TypeBar/>
        </Col>
        <Col md= {10}>
            <DeveloperBar/>
            <GameList/>
            <Pages/>
        </Col>
      </Row>
    </Container>
  );
})

export default Shop;

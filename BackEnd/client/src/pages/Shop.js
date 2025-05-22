// Shop.js (главная страница)
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import DeveloperBar from '../components/DeveloperBar';
import GameList from '../components/GameList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchDevelopers, fetchGames, fetchTypes } from '../http/GameAPI';
import Pages from '../components/Pages';
import '../styles/Shop.css';

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
    <Container className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">Игровой каталог</h1>
        <p className="shop-subtitle">Лучшие игры от ведущих разработчиков</p>
      </div>
      
      <Row className="shop-content">
        <Col md={3} className="sidebar-col">
          <div className="sidebar-filter">
            <h3 className="filter-title">Фильтры</h3>
            <TypeBar/>
          </div>
        </Col>
        
        <Col md={9} className="main-content-col">
          <div className="developers-section">
            <h3 className="section-title">Разработчики</h3>
            <DeveloperBar/>
          </div>
          
          <div className="games-section">
            <h3 className="section-title">Игры</h3>
            <GameList/>
          </div>
          
          <div className="pagination-section">
            <Pages/>
          </div>
        </Col>
      </Row>
    </Container>
  );
})

export default Shop;
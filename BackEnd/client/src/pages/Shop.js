import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import TypeBar from '../components/TypeBar';
import DeveloperBar from '../components/DeveloperBar';
import GameList from '../components/GameList';

const Shop = () => { 
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
}

export default Shop;

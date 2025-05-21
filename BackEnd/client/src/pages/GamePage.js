import React, { useEffect, useState } from 'react';
import { Image, Col, Container, Row, Button, Card } from 'react-bootstrap';
import star from '../assets/StarForRatingShop.png';
import {useParams} from 'react-router-dom'
import { fetchOneGame } from '../http/GameAPI';

const GamePage = () => {
  const [game, setGame] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
    fetchOneGame(id).then(data => setGame(data))
  }, [])

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image 
            width={300} 
            height={300} 
            src={process.env.REACT_APP_API_URL + game.img} 
            alt={game.name}
          />
        </Col>
        
        <Col md={4} className="d-flex flex-column align-items-center">
          <h2 className="text-center">{game.name}</h2>
          <div 
            className="d-flex align-items-center justify-content-center"
            style={{
              background: `url(${star}) no-repeat center center`,
              width: 240, 
              height: 240,
              backgroundSize: 'cover',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              fontSize: 64,
              color: 'white',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              {game.rating}
            </div>
          </div>
        </Col>
        
        <Col md={4}>
           <Card
             className="d-flex flex-column align-items-center justify-content-around"
             style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
           >
              <h3>{game.price} $</h3>
              <Button variant={"outline-dark"}>Добавить в карзину</Button>
           </Card>
        </Col>
      </Row>
      <Row className = "d-flex flex-column m-3">
        <h1>Минимальные характеристики</h1>
        {game.info.map((info, index) =>
        <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
          {info.title}: {info.description}
        </Row>
        )}
      </Row>
    </Container>
  );
};

export default GamePage;
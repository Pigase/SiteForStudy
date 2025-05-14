import React from 'react';
import { Image, Col, Container, Row, Button, Card } from 'react-bootstrap';
import star from '../assets/StarForRatingShop.png';

const GamePage = () => {
  const game = {
    id: 1, 
    name: "FlappyBird", 
    price: 5, 
    rating: 3, 
    img: "https://clipartflare.com/images/fl5889fdb4-flappy-bird-flappy-bird-sprite-png-clipart-full-size-clipart-3703571.png"
  };
  const description = [
    {id:1, title: 'Требуемая оперативная память', description: '16 гб'},
    {id:2, title: 'Требуемая Процессор', description: 'Ryzen 7 7700'},
    {id:3, title: 'Требуемая Видеокарта', description: 'Nvidia 5070'},
    {id:4, title: 'Требуемая Память', description: '400 мб'},
    {id:5, title: 'Требуемая разрешение', description: '1940x1080'},
  ]

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image 
            width={300} 
            height={300} 
            src={game.img} 
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
        {description.map((info, index) =>
        <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
          {info.title}: {info.description}
        </Row>
        )}
      </Row>
    </Container>
  );
};

export default GamePage;
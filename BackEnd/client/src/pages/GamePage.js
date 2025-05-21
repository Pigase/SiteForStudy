import React, { useEffect, useState, useContext } from 'react';
import { Image, Col, Container, Row, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneGame, rateGame, checkUserRating } from '../http/GameAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const GamePage = observer(() => {
  const [game, setGame] = useState({ info: [] });
  const [userRating, setUserRating] = useState(0);
  const { user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOneGame(id).then(data => setGame(data));
    
    if (user.isAuth) {
      checkUserRating(id).then(data => {
        if (data) setUserRating(data.rate);
      });
    }
  }, [id, user.isAuth]);

  const handleRate = async (rate) => {
  if (!user.isAuth) {
    alert('Для оценки необходимо авторизоваться!');
    return;
  }

  try {

    const numericRate = Number(rate);
    if (isNaN(numericRate) || numericRate < 1 || numericRate > 5) {
      throw new Error('Оценка должна быть от 1 до 5');
    }

    await rateGame(id, numericRate); 
    const updatedGame = await fetchOneGame(id);
    setGame(updatedGame);
    setUserRating(numericRate);
  } catch (e) {
    alert(e.response?.data?.message || e.message);
  }
};

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        style={{
          cursor: 'pointer',
          color: star <= (userRating || game.rating) ? 'gold' : 'gray',
          fontSize: '2rem',
          margin: '0 2px'
        }}
        onClick={() => handleRate(star)}
      >
        ★
      </span>
    ));
  };

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
          <div className="text-center">
            <div className="mb-2">{renderStars()}</div>
            <div>Рейтинг: {game.rating || 0}</div>
            {userRating > 0 && <div>Ваша оценка: {userRating}</div>}
          </div>
        </Col>
        
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
          >
            <h3>{game.price} $</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {game.info?.map((info, index) => (
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default GamePage;
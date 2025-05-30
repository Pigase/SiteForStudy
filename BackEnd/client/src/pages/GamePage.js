import React, { useEffect, useState, useContext } from 'react';
import { Image, Col, Container, Row, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneGame, rateGame, checkUserRating } from '../http/GameAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { addToBasket, getBasket, removeFromBasket } from '../http/basketAPI';
import '../styles/GamePage.css';

const GamePage = observer(() => {
  const [game, setGame] = useState({ info: [] });
  const [userRating, setUserRating] = useState(0);
  const [isInBasket, setIsInBasket] = useState(false);
  const [basketItemId, setBasketItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchOneGame(id)
      .then(data => setGame(data))
      .finally(() => setLoading(false));
    
    if (user.isAuth) {
      checkUserRating(id).then(data => {
        if (data) setUserRating(data.rate);
      });
      loadBasketData();
    }
  }, [id, user.isAuth]);

  const loadBasketData = async () => {
    try {
      const basketData = await getBasket();
      const basketItems = Array.isArray(basketData.basket_games) ? basketData.basket_games : [];
      const basketItem = basketItems.find(item => item.gameId === parseInt(id));
      
      setIsInBasket(!!basketItem);
      setBasketItemId(basketItem?.id || null);
    } catch (e) {
      console.error("Ошибка загрузки корзины:", e);
    }
  };

  const showNotification = (message, variant = 'success') => {
    setNotification({ message, variant });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToBasket = async () => {
    try {
      await addToBasket(game.id);
      await loadBasketData();
      showNotification('Игра добавлена в корзину!');
    } catch (e) {
      console.error("Ошибка добавления в корзину:", e);
      showNotification(e.response?.data?.message || 'Ошибка добавления в корзину', 'danger');
    }
  };

  const handleRemoveFromBasket = async () => {
    if (!basketItemId) return;
    
    try {
      await removeFromBasket(basketItemId);
      await loadBasketData();
      showNotification('Игра удалена из корзины');
    } catch (e) {
      console.error("Ошибка удаления:", e);
      showNotification(e.response?.data?.message || 'Ошибка при удалении', 'danger');
    }
  };

  const handleRate = async (rate) => {
    if (!user.isAuth) {
      showNotification('Для оценки необходимо авторизоваться!', 'warning');
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
      showNotification('Спасибо за вашу оценку!');
    } catch (e) {
      showNotification(e.response?.data?.message || e.message, 'danger');
    }
  };
const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        className="rating-star"
        onClick={() => handleRate(star)}
        style={{
          color: star <= (userRating || game.rating) ? '#ffc107' : '#e4e5e9',
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <Container className="game-loading-container">
        <div className="game-loading-spinner"></div>
      </Container>
    );
  }

  return (
  <Container className="game-page-container">
    {notification && (
      <Alert 
        variant={notification.variant} 
        className="game-notification"
        onClose={() => setNotification(null)} 
        dismissible
      >
        {notification.message}
      </Alert>
    )}
    
    <Row className="game-header-row">
      <Col lg={8}>
        <div className="game-title-wrapper">
          <h1 className="game-title">{game.name}</h1>
          <Badge bg="secondary" className="game-genre-badge">{game.genre}</Badge>
        </div>
        
        <div className="game-rating-section">
          <div className="game-rating-stars">{renderStars()}</div>
          <div className="game-rating-value">
            Рейтинг: <strong>{game.rating?.toFixed(1) || 0}</strong>/5
            {userRating > 0 && (
              <span className="user-rating-badge">Ваша оценка: {userRating}</span>
            )}
          </div>
        </div>
      </Col>
    </Row>
    
    <Row className="game-main-row align-items-start">
      <Col md={8}>
        <Row>
          <Col md={7} className="game-media-col">
            <div className="game-image-wrapper">
              <Image 
                src={process.env.REACT_APP_API_URL + game.img} 
                alt={game.name}
                className="game-main-image"
                fluid
              />
            </div>
          </Col>
          
          <Col md={5} className="game-purchase-col">
            <Card className="game-purchase-card">
              <Card.Body>
                <div className="game-price-wrapper">
                  <span className="game-price">{game.price} $</span>
                  {game.discount > 0 && (
                    <span className="game-discount-badge">-{game.discount}%</span>
                  )}
                </div>
                
                <div className="game-actions">
                  {isInBasket ? (
                    <Button 
                      variant="danger" 
                      className="game-action-btn"
                      onClick={handleRemoveFromBasket}
                    >
                      Убрать из корзины
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      className="game-action-btn"
                      onClick={handleAddToBasket}
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Переносим блок с описанием сюда */}
        <Row className="mt-4">
          <Col>
            <Card className="game-specs-card">
              <Card.Body>
                <Card.Title className="game-specs-title">Описание</Card.Title>
                <div className="game-specs-list">
                  {game.info?.map((info, index) => (
                    <div key={info.id} className="game-spec-item">
                      <span className="game-spec-title">{info.title}:</span>
                      <span className="game-spec-value">{info.description}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);
});

export default GamePage;
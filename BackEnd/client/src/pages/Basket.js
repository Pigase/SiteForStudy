import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Context } from '../index';
import { getBasket, removeFromBasket } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';
import { SHOP_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';
import '../styles/Basket.css'; // Создайте этот файл для дополнительных стилей

const Basket = observer(() => {
    const { user } = useContext(Context);
    const [basketItems, setBasketItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                setBasketItems(data.basket_games || []);
                calculateTotal(data.basket_games || []);
            });
        }
    }, [user.isAuth]);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.game?.price || 0), 0);
        setTotal(sum);
    };

    const handleRemove = async (id) => {
        await removeFromBasket(id);
        const updatedBasket = await getBasket();
        setBasketItems(updatedBasket.basket_games || []);
        calculateTotal(updatedBasket.basket_games || []);
    };

    return (
        <Container className="basket-container">
            <div className="basket-header">
                <h1 className="basket-title">Ваша корзина</h1>
                <span className="basket-count">{basketItems.length} {basketItems.length === 1 ? 'товар' : basketItems.length < 5 ? 'товара' : 'товаров'}</span>
            </div>
            
            {basketItems.length > 0 ? (
                <div className="basket-content">
                    <div className="basket-items">
                        {basketItems.map(item => (
                            <Card key={item.id} className="basket-item">
                                <Row className="align-items-center">
                                    <Col xs={4} md={3} lg={2}>
                                        <div className="basket-item-img-container">
                                            <img
                                                src={process.env.REACT_APP_API_URL + item.game.img}
                                                className="basket-item-img"
                                                alt={item.game.name}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={8} md={6} lg={7}>
                                        <div className="basket-item-info">
                                            <h5 className="basket-item-title">{item.game.name}</h5>
                                            <div className="basket-item-price">{item.game.price} ₽</div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={3} lg={3} className="mt-3 mt-md-0">
                                        <Button 
                                            variant="outline-danger"
                                            className="basket-item-remove"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <i className="bi bi-trash"></i> Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                    
                    <Card className="basket-summary">
                        <Card.Body>
                            <div className="summary-row">
                                <span>Товары ({basketItems.length})</span>
                                <span>{total} ₽</span>
                            </div>
                            <div className="summary-row">
                                <span>Доставка</span>
                                <span className="text-success">Бесплатно</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row total">
                                <span>Итого</span>
                                <span className="basket-total">{total} ₽</span>
                            </div>
                            
                            <Button variant="primary" className="checkout-btn">
                                Перейти к оформлению
                            </Button>
                            
                            <div className="continue-shopping">
                                <Link to={SHOP_ROUTE} className="continue-link">
                                    <i className="bi bi-arrow-left"></i> Продолжить покупки
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <Card className="empty-basket">
                    <Card.Body className="text-center">
                        <div className="empty-basket-icon">
                            <i className="bi bi-cart-x"></i>
                        </div>
                        <h3 className="empty-basket-title">Ваша корзина пуста</h3>
                        <p className="empty-basket-text">Добавьте товары из каталога, чтобы продолжить</p>
                        <Link to={SHOP_ROUTE} className="empty-basket-btn">
                            Перейти в каталог
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
});

export default Basket;
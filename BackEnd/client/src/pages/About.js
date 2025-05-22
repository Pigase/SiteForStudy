import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FaGamepad, FaHeadset, FaAward, FaShippingFast } from 'react-icons/fa';
import logo from  '../assets/GameLogo.png'
import team1 from '../assets/front.jpg'; // Добавьте свои изображения
import team2 from '../assets/right.jpg';
import team3 from '../assets/left.jpg';
import '../styles/About.css';
import {useNavigate} from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts';

const About = () => {
       const history = useNavigate()
    
    return (
        <Container className="about-page">
            {/* Герой секция */}
            <Row className="about-hero align-items-center">
                <Col md={6}>
                    <h1 className="hero-title">О МагазинИгр</h1>
                    <p className="hero-text">
                        Мы - ведущий онлайн-магазин игр, предлагающий лучшие цифровые развлечения с 2015 года. 
                        Наша миссия - делать игры доступными для всех.
                    </p>
                </Col>
                <Col md={6} className="text-center">
                    <div className="hero-image"></div>
                </Col>
            </Row>

            {/* Наши преимущества */}
            <Row className="features-section">
                <Col className="text-center mb-5">
                    <h2 className="section-title">Почему выбирают нас</h2>
                </Col>
                
                <Col md={3} className="feature-card">
                    <FaGamepad className="feature-icon" />
                    <h3>Огромный ассортимент</h3>
                    <p>Более 10,000 игр от инди до AAA-проектов</p>
                </Col>
                
                <Col md={3} className="feature-card">
                    <FaHeadset className="feature-icon" />
                    <h3>Поддержка 24/7</h3>
                    <p>Наша служба поддержки всегда на связи</p>
                </Col>
                
                <Col md={3} className="feature-card">
                    <FaAward className="feature-icon" />
                    <h3>Лучшие цены</h3>
                    <p>Гарантия низкой цены или возврат разницы</p>
                </Col>
                
                <Col md={3} className="feature-card">
                    <FaShippingFast className="feature-icon" />
                    <h3>Мгновенная доставка</h3>
                    <p>Ключи активируются сразу после оплаты</p>
                </Col>
            </Row>

            {/* Наша история */}
            <Row className="history-section align-items-center">
                <Col md={6}>
                    <Image src={logo} fluid rounded className="history-image" />
                </Col>
                <Col md={6}>
                    <h2 className="section-title">Наша история</h2>
                    <p>
                        МагазинИгр начался с маленькой команды энтузиастов в 2015 году. 
                        Сегодня мы - один из крупнейших цифровых магазинов игр в СНГ с 
                        миллионами довольных клиентов.
                    </p>
                    <p>
                        Мы гордимся тем, что поддерживаем независимых разработчиков и 
                        предлагаем эксклюзивные условия для наших покупателей.
                    </p>
                </Col>
            </Row>

            {/* Наша команда */}
            <Row className="team-section">
                <Col className="text-center mb-5">
                    <h2 className="section-title">Наша команда</h2>
                    <p className="section-subtitle">Профессионалы, которые делают ваш игровой опыт лучше</p>
                </Col>
                
                <Col md={3} className="team-member">
                    <Image src={team1} roundedCircle className="team-photo" />
                    <h3>Мышкевич Александр</h3>
                    <p className="position">Основатель & CEO</p>
                    <p>Геймер со стажем, знает все о игровой индустрии</p>
                </Col>
                
                <Col md={3} className="team-member">
                    <Image src={team2} roundedCircle className="team-photo" />
                    <h3>Мышкевич Александр</h3>
                    <p className="position">Главный редактор</p>
                    <p>Отбирает только лучшие игры для нашего каталога</p>
                </Col>
                
                <Col md={3} className="team-member">
                    <Image src={team3} roundedCircle className="team-photo" />
                    <h3>Мышкевич Александр</h3>
                    <p className="position">Технический директор</p>
                    <p>Следит за бесперебойной работой платформы</p>
                </Col>
            </Row>

            {/* CTA секция */}
            <Row className="cta-section text-center">
                <Col>
                    <h2>Готовы начать игровое приключение?</h2>
                    <Button  variant="primary" size="lg" className="cta-button" onClick={() => history(SHOP_ROUTE)}>
                        Перейти в каталог
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
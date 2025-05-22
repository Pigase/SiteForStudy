import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button , Badge} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom'
import { getBasket } from '../http/basketAPI';

const NavBar = observer(() => { 
    const {user} = useContext(Context)
   const history = useNavigate()

   const [basketCount, setBasketCount] = useState(0)

   useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                setBasketCount(data.basket_games?.length || 0);

            });
        }
    }, [user.isAuth]);

   const logOut = ()=> {
    user.setUser({})
    user.setIsAuth(false)
   }
    
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color:'white'}} to = {SHOP_ROUTE}>МагазинИгр</NavLink>
          {user.isAuth ?
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button 
                     className="me-1"
                     variant="outline-light" 
                     onClick={() => history(BASKET_ROUTE)}
                >
                   Корзина
                   {basketCount > 0 && (
                      <Badge bg="info" className="ms-3 ml-1">
                   {basketCount}
                 </Badge>
               )}
            </Button>
            <Button 
            variant={"outline-light"} 
            onClick={() => history(ADMIN_ROUTE)}
            className="me-3"
            >
              Админ Панель
            </Button>
            <Button 
            variant={"outline-light"}
            onClick={() => logOut()}
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        }
        </Container>
      </Navbar>
  );
})

export default NavBar;

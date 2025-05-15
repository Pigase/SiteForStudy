import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => { 
    const {user} = useContext(Context)
   const history = useNavigate()
    
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color:'white'}} to = {SHOP_ROUTE}>МагазинИгр</NavLink>
          {user.isAuth ?
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button 
            variant={"outline-light"} 
            onClick={() => history(ADMIN_ROUTE)}
            className="me-3"
            >
              Админ Панель
            </Button>
            <Button 
            variant={"outline-light"}
            onClick={() => history(LOGIN_ROUTE)}
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{color:'white'}}>
            <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
        }
        </Container>
      </Navbar>
  );
})

export default NavBar;

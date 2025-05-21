import React from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import star from '../assets/StarForRatingShop.png'
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom'
import { GAME_ROUTE } from '../utils/consts';

const GameItem = ({game}) => { 
    const history = useNavigate()
  return (
    <Col md = {3} className="mt-3" onClick={() => history(GAME_ROUTE + '/' + game.id)}>
       <Card
          style={{width: 150, cursor: 'pointer'}}
          border={"light"}
       >
          <Image 
            width={150}
            height={150}
            src={process.env.REACT_APP_API_URL + game.img}
          />
          <div className="mt-1 d-flex justify-content-between algin-items-center">
            <div>{game.name}</div>
            <div className="d-flex algin-items-center" >
                <div>{game.rating}</div>
                <Image
                 width={22}
                 height={22} 
                 src= {star}/>
            </div>
          </div>
          <div className="text-black-50">
                Аркада
          </div>
       </Card>
    </Col>
  );
}

export default GameItem;

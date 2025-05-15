import React, { useContext, useState } from 'react';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";


const CreateGame = ({show, onHide}) => { 
  const {game} = useContext(Context)
  const [info, setinfo] = useState([])

  const addInfo = () => 
  {
    setinfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => 
  {
    setinfo(info.filter(i => i.number !== number))
  }

  return (
    <Modal
      show = {show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить игру
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown  className="mt-2 mb-2">
              <Dropdown.Toggle variant="outline-dark">
                 Выбирите тип
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {game.types.map(type =>
                  <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant="outline-dark">
                 Выбирите Разработчика
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {game.developers.map(developer =>
                  <Dropdown.Item key={developer.id}>{developer.name}</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
            className="mt-3"
            placeholder="Введите название игры"
            />
            <Form.Control
            className="mt-3"
            placeholder="Введите стоимость игры"
            type="number"
            />
            <Form.Control
            className="mt-3"
            type="file"
            />
            <hr/>
            <Button
            variant="outline-dark"
            onClick={addInfo}
            >
              Добавить новое свойство
            </Button>
            {
              info.map(i =>
                <Row className="mt-3" key={i.number}>
                  <Col md ={4} className="mt-1">
                     <Form.Control
                        placeholder="Введите название характеристики"
                     />
                  </Col>
                  <Col md ={4} className="mt-1">
                     <Form.Control
                        placeholder="Введите описание характеристики"
                     />
                  </Col>
                  <Col md ={4} className="mt-1">
                     <Button 
                     variant="outline-dark"
                     onClick={() => removeInfo(i.number)}
                     >
                         Удалить
                     </Button>
                  </Col>
                </Row>
              )
            }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={onHide}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateGame;

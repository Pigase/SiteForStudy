import React, { useContext, useState, useEffect } from 'react';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { createGame, fetchDevelopers, fetchTypes } from '../../http/GameAPI';
import { observer } from 'mobx-react-lite';



const CreateGame = observer( ({show, onHide}) => { 
  const {game} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

    useEffect(() => {
      fetchTypes().then(data => game.setTypes(data))
      fetchDevelopers().then(data => game.setDevelopers(data))
    }, [])

  const addInfo = () => 
  {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => 
  {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => 
  {
    setInfo(info.map(i => i.number === number ? {...i, [key] : value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addGame = () => 
  {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('developerId', game.selectedDeveloper.id)
    formData.append('typeId', game.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createGame(formData).then(data => onHide())
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
                 {game.selectedType.name || "Выбирите тип"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {game.types.map(type =>
                  <Dropdown.Item 
                    onClick = {() => game.setSelectedType(type)} 
                    key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant="outline-dark">
                 {game.selectedDeveloper.name || "Выбирите Разработчика"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {game.developers.map(developer =>
                  <Dropdown.Item 
                    onClick = {() => game.setSelectedDeveloper(developer)} 
                    key={developer.id}>
                      {developer.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-3"
              placeholder="Введите название игры"
            />
            <Form.Control
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="mt-3"
              placeholder="Введите стоимость игры $"
              type="number"
            />
            <Form.Control
              className="mt-3"
              type="file"
              onChange={selectFile}
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
                       value={i.title}
                       onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        placeholder="Введите название характеристики"
                     />
                  </Col>
                  <Col md ={4} className="mt-1">
                     <Form.Control
                       value={i.description}
                       onChange={(e) => changeInfo('description', e.target.value, i.number)}
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
        <Button variant="outline-success" onClick={addGame}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateGame;

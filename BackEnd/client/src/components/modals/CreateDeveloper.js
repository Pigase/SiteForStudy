import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {createDeveloper} from "../../http/GameAPI";

const CreateDeveloper = ({show, onHide}) => { 
  const[value, setValue] = useState('')
  
    const addDeveloper = () => {
      createDeveloper({name: value}).then(data => {
        setValue('')
        onHide()
      })
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
          Добавить нового Разработчика
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={"Введите название типа"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDeveloper}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateDeveloper;

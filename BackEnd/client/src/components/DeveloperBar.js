import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Context } from "../index";

const DeveloperBar = observer(() => { 
    const { game } = useContext(Context);

    return (
        <Row className="d-flex flex-wrap g-1">
            {game.developers.map(developer => (
                <Col 
                   xs="auto" 
                   key={developer.id}
                >
                    <Card 
                    className="p-2" 
                    onClick={() => game.setSelectedDeveloper(developer)}
                    border={developer.id === game.selectedDeveloper.id ? 'danger' : 'light'}
                    style={{ cursor: 'pointer' }}
                    >
                        {developer.name}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default DeveloperBar;
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Spinner, Table, Form, Button, Dropdown } from 'react-bootstrap';

const FormData = ( { Gener, handleName, handleGener, handlerSubmit } ) => {
    return (
        <Form>
            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa Nombre"
                    onChange={handleName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Dropdown onSelect={(ev) => handleGener(ev)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {
                            Gener != -1 ? (Gener == 0) ? "Masculino" : "Femenino" : "Seleccione un genero"

                        }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="0">Masculino</Dropdown.Item>
                        <Dropdown.Item eventKey="1">Femenino</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
            <Button variant="primary" style={{ marginLeft: "1em" }} onClick={handlerSubmit}>
                Guardar
            </Button>
        </Form>
    )
}

FormData.propTypes = {

}

export default FormData

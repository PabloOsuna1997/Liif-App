import React from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Alert, InputGroup, DropdownButton, Navbar, Container, Col, Row, Dropdown, FormControl } from 'react-bootstrap';

const TableCuotes = ({ Monthly, cuotes }) => {

    return (<Card style={{
        position: 'relative',
        width: '80%'
    }}>
        <Row className="justify-content-md-center" style={{ marginTop: '2em' }}>
            <Col xs lg="4">
                <h2>
                    Cuota Mensual:  Q{Monthly}
                </h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className="cuotestables">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Capital</th>
                                <th>Interes</th>
                                <th>Total Cuota</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cuotes()
                            }
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    </Card>
    )
}

TableCuotes.propTypes = {

}

export default TableCuotes

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Spinner, Table, Form, Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import Select from '../components/Select';
import TableTheme from '../components/TableTheme'
import TableFields from '../components/TableFields'
import FormData from '../components/FormData'

const Providers = ({ addProviders, addData, addFields }) => {
    const history = useHistory();
    const [Providers, setProviders] = useState([]);
    const [ProviderSelect, setProviderSelect] = useState({})
    const [ProviderFields, setProviderFields] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:3000/`)
            .then(res => {
                setProviders(res.data.providers);
                addProviders(res.data.providers);
            })
    }, [])


    const onSelectHandler = (event) => {
        if (event != undefined) {
            setProviderSelect(Providers[Number(event)])
            //hacer peticion
            if (event == 0) {
                axios.get(`http://localhost:3000/alchilazo`)
                    .then(res => {
                        setProviderFields(res.data);
                        addFields(res.data)
                        console.log("alchilazo", res.data)
                    })
            } else {
                axios.get(`http://localhost:3000/creditosya`)
                    .then(res => {
                        setProviderFields(res.data);
                        addFields(res.data)
                        console.log("creditos ya", res.data)
                    })
            }
        }
    }

    return (
        <Container className="justify-content-md-center">
            <Row className="justify-content-md-center">
                <Col>
                    <span>Proveedor de Credito</span>
                    {
                        Providers.length > 0 ?
                            <Select
                                select={ProviderSelect}
                                providers={Providers}
                                onSelectHandler={onSelectHandler} />
                            :
                            <Spinner animation="border" />
                    }
                </Col>
            </Row>
            <Row>

                {
                    (ProviderSelect.providerCode != undefined) ?
                        <Col xs={6}>
                            <span>Tema:</span>
                            <TableTheme ProviderSelected={ProviderSelect.theme} />

                        </Col>
                        :
                        null
                }
                {
                    (ProviderFields.providerCode != undefined) ?
                        < Col xs={6}>
                            < span > Campos:</span>
                            <TableFields ProviderFields={ProviderFields} />
                        </Col>
                        :
                        null
                }
            </Row >
        </Container >
    );
}

const mapStateProps = dispatchEvent => {
    return {
        addProviders: (value) => {
            dispatchEvent({ type: 'ADD_PROVIDER', payload: value })
        },
        addFields: (value) => {
            dispatchEvent({ type: 'ADD_FIELDS', payload: value })
        }
    }
}

export default connect(null, mapStateProps)(Providers)
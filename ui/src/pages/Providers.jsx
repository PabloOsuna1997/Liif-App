import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Spinner, Table, Form, Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import Select from '../components/Select';
import TableTheme from '../components/TableTheme'
import FormData from '../components/FormData'

const Providers = ({ addProviders, addData }) => {
    const history = useHistory();
    const [Providers, setProviders] = useState([]);
    const [ProviderSelect, setProviderSelect] = useState({})
    const [Name, setName] = useState("")
    const [Gener, setGener] = useState(-1)

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
        }
    }

    const handleGener = (ev) => {
        setGener(ev)
    }

    const handleName = (ev) => {
        setName(ev.target.value)
    }

    const handleSubmit = () => {
        addData({name: Name, gener: Gener})
        history.push('/credits')
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
                <Col>
                    <span>Tema:</span>
                    <TableTheme ProviderSelected={ProviderSelect.theme} />
                </Col>
                <Col>
                    <FormData Gener={Gener} handleName={handleName} handleGener={handleGener} handleSubmit={handleSubmit}/>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateProps = dispatchEvent => {
    return {
        addProviders: (value) => {
            dispatchEvent({ type: 'ADD_PROVIDER', payload: value })
        },
        addData: (value) => {
            dispatchEvent({ type: 'ADD_DATA', payload: value })
        }
    }
}

export default connect(null, mapStateProps)(Providers)
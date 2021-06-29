import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Spinner, Table, Form, Button, Dropdown, Card} from 'react-bootstrap';
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
        axios.get(`http://18.118.253.240:3000/`)
            .then(res => {
                setProviders(res.data.providers);
            })
    }, [])


    const onSelectHandler = (event) => {
        if (event != undefined) {            
            addProviders(Providers[Number(event)]);
            setProviderSelect(Providers[Number(event)])
            //hacer peticion
            if (event == 0) {
                axios.get(`http://18.118.253.240:3000/alchilazo`)
                    .then(res => {                        
                        console.log("alchilazo", res.data)
                        setProviderFields(res.data);
                        addFields(res.data)
                    })
            } else {
                axios.get(`http://18.118.253.240:3000/creditosya`)
                    .then(res => {
                        console.log("creditos ya", res.data)
                        setProviderFields(res.data);
                        addFields(res.data)
                    })
            }
        }
    }

    const handlerSubmit = () => {
        history.push('/credits')
    }

    return (
        <Card style={{width: '90%', marginLeft: '6em'}}>
            <Container style={{marginTop:'5%', marginBottom:'2em'}} >
            <Row className="justify-content-md-center">
                <Col  lg="2" sm={8}>
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
            <Row style={{marginTop:'8%', position:'relative'}}>

                {
                    (ProviderSelect.providerCode != undefined) ?
                        <Col xs={5}>
                            <span>Tema:</span>
                            <TableTheme ProviderSelected={ProviderSelect.theme} />

                        </Col>
                        :
                        null
                }
                {
                    (ProviderFields.providerCode != undefined) ?
                        <section>
                            < Col xs={6}>
                                < span > Campos:</span>
                                <TableFields ProviderFields={ProviderFields} />
                            </Col>

                            <Button variant="dark" style={{ marginLeft: "1em" , marginTop:'1em'}} onClick={handlerSubmit}>
                                Guardar
                            </Button>
                        </section>
                        :
                        null
                }
            </Row >
        </Container >
        </Card>
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
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Card, Container, Row, Col, Spinner, Table, Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios'

const CalculatorCredits = ({ fields, providers }) => {

    const renderOptions = (options) => {
        const items = []
        for (let j = 0; j < options.length; j++) {
            console.log(options[j].value, options[j].text)
            items.push(<option value={options[j].value}>{options[j].text}</option>)
        }
        return items
    }

    const renderFields = () => {

        const items = []
        for (let i = 0; i < fields.fields.length; i++) {
            if (i == 3) {
                break;
            }
            if (fields.fields[i].type == 'select') {
                items.push(
                    <select className="selects" title={fields.fields[i].title} required={fields.fields[i].required} name={fields.fields[i].title} id={fields.fields[i].code}>
                        {
                            renderOptions(fields.fields[i].options)
                        }
                    </select>)
            } else {
                items.push(
                    <Container>
                        <input onChange={(e) => console.log(e.target.value)} className="inputs" id={fields.fields[i].code}
                            type={fields.fields[i].type}
                            placeholder={fields.fields[i].code}
                            title={fields.fields[i].title}
                            required={fields.fields[i].required}
                        ></input>
                    </Container>
                )
            }
        }

        return items
    }

    const renderFields2 = () => {

        const items = []
        for (let i = 3; i < fields.fields.length; i++) {
            if (fields.fields[i].type == 'select') {
                items.push(
                    <select className="selects" title={fields.fields[i].title} required={fields.fields[i].required} name={fields.fields[i].title} id={fields.fields[i].code}>
                        {
                            renderOptions(fields.fields[i].options)
                        }
                    </select>)
            } else {
                items.push(
                    <Container>
                        <input className="inputs" id={fields.fields[i].code}
                            type={fields.fields[i].type}
                            placeholder={fields.fields[i].code}
                            title={fields.fields[i].title}
                            required={fields.fields[i].required}
                        ></input>
                    </Container>
                )
            }
        }

        return items
    }

    const submit = async () => {

        const data = {
            Cod: "Sol-2021XX",
            fieldsValues: {
                Name: document.getElementById("Name").value,
                LastName: document.getElementById("LastName").value,
                IdNumber: document.getElementById("IdNumber").value,
                Gender: document.getElementById("Gender").value,
                Income: document.getElementById("Income").value,
                Address: document.getElementById("Address").value,
                Country: document.getElementById("Country") != null ? document.getElementById("Country").value : ""
            }
        }
        console.log(data);

        let res = await axios.post('http://localhost:3000/addrequest', data);
        let response = res.data;
        console.log(response);
    }

    return (
        <>
            <Navbar
                style={{
                    background: providers.theme.headerBackgroundColor
                }}>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={providers.theme.logoUrl}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    {providers.providerName}
                </Navbar.Brand>
            </Navbar>

            <Container style={{
                marginTop: '1em'
            }}>
                <Row className="justify-content-md-center">
                    <Col lg="6">
                        <Card>
                            <h1 style={{
                                textAlign: 'center'
                            }}>Formulario de Credito</h1>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Card style={{
                marginTop: '5%',
                marginLeft: '25%',
                width: '50%'
            }}>
                <form>
                    <Row>
                        <Col>
                            {
                                renderFields()
                            }
                        </Col>
                        <Col>
                            {
                                renderFields2()
                            }
                        </Col>
                    </Row>
                    <Button variant="dark" style={{
                        marginTop: '3em',
                        marginLeft: "23em"
                    }}
                        onClick={submit} >
                        Enviar Solicitud
                    </Button>
                </form>
            </Card>
        </>
    )
}

CalculatorCredits.propTypes = {

}

const mapStateProps = state => ({ fields: state.fields, providers: state.providers })

export default connect(mapStateProps)(CalculatorCredits)
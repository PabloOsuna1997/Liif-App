import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Alert, InputGroup, DropdownButton, Navbar, Container, Col, Row, Dropdown, FormControl } from 'react-bootstrap';

const CardCalc = ({ providers, AmountAllow, setAmountAllow, type, handleSelect, renderTypes, Rate, handleAmount, Terms, handleSelectTerms, renderTerms, handlerSubmit }) => {
    return (
        <Card style={{
            position: 'relative',
            marginLeft: '30%',
            width: '60%',
            alignContent: 'center'
        }}>
            <Col style={{ alignContent: 'center' }}>
                <span style={{
                    position: 'relative',
                    marginLeft: '7em',
                    fontSize: providers.theme.fontSizes.title
                }}
                >
                    CALCULADORA
                </span>
                {!AmountAllow && (
                    <Alert
                        width='9em'
                        className="mt-4 align-middle"
                        variant="danger"
                        onClose={() => setAmountAllow(false)}
                        dismissible
                        style={{ fontSize: "0.9em", color: "black" }}
                    >
                        <p >Monto no permitido por el tipo de Credito.</p>
                    </Alert>
                )}
            </Col>
            <Row className="justify-content-md-center" style={{ marginTop: '4em' }}>
                <Col sm={4}>
                    <span style={{
                        fontSize: providers.theme.fontSizes.subTitle
                    }}>Tipo de Credito</span>
                    <DropdownButton variant="dark"
                        style={{
                            width: '50px'
                        }}
                        alignRight
                        title={type != "" ? type : "Tipo de credito"}
                        id="dropdown-menu-align-center"
                        onSelect={handleSelect}>
                        {
                            providers.loanCalculation.loanTypes != undefined ?
                                renderTypes(providers.loanCalculation.loanTypes) : null
                        }
                    </DropdownButton>
                </Col>
                <Col sm={6} style={{ marginLeft: '2em' }}>
                    <span style={{
                        fontSize: providers.theme.fontSizes.subTitle
                    }}>Tasa del tipo de credito: {Rate}%</span>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{ marginTop: '4em' }}>
                <Col sm={4}>
                    <span style={{
                        fontSize: providers.theme.fontSizes.subTitle
                    }}>Monto del Credito</span>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl aria-label="Amount (to the nearest dollar)" onChange={e => handleAmount(e)} />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col sm={6} style={{ marginLeft: '2em' }}>
                    <span style={{
                        fontSize: providers.theme.fontSizes.subTitle
                    }}>Plazo del Credito</span>
                    <DropdownButton variant="dark"
                        alignRight
                        title={Terms != "" ? Terms : "Seleccion Plazos"}
                        id="dropdown-menu-align-center"
                        onSelect={handleSelectTerms}>
                        {
                            providers.loanCalculation.terms != undefined ?
                                renderTerms(providers.loanCalculation.terms) : null
                        }
                    </DropdownButton>
                </Col>
            </Row>

            <Button variant="dark" style={{ marginLeft: "1em" }} onClick={(e) =>handlerSubmit()}>
                Guardar
            </Button>
        </Card>
    )
}

CardCalc.propTypes = {

}

export default CardCalc

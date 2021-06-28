import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Alert, InputGroup, DropdownButton, Navbar, Container, Col, Row, Dropdown, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import SelectCredit from '../components/SelectCredit'


const FormCredit = ({ providers }) => {
    const [Rate, setRate] = useState(0)
    const [type, setType] = useState('');
    const [AmountAllow, setAmountAllow] = useState(true)
    const [Terms, setTerms] = useState(0)
    const [Amount, setAmount] = useState(0)
    const [Monthly, setMonthly] = useState(0)


    const handleSelect = (e) => {
        if (e == 'Hipotecario') {
            setRate(providers.loanCalculation.rates.Hipotecario)
        } else if (e === 'Fiduciario') {
            setRate(providers.loanCalculation.rates.Fiduciario)
        } else {
            setRate(providers.loanCalculation.rates.Automovil)
        }
        setType(e)
    }
    const handleSelectTerms = (e) => {
        setTerms(e)
        console.log("cuota mensual", Amount, Rate, Terms)
        setMonthly(((Number(Amount) * (1 + Number(Rate))) / (Number(e))).toFixed(2))
    }

    const renderTypes = (loanTypes) => {
        const render = loanType => (
            <Dropdown.Item eventKey={loanType}>{loanType}</Dropdown.Item>
        )

        return loanTypes.map(render)
    }
    const renderTerms = (Terms) => {
        const render = Term => (
            <Dropdown.Item eventKey={Term}>{Term}</Dropdown.Item>
        )
        return Terms.map(render)
    }

    const handleAmount = (amount) => {
        console.log(amount.target.value)
        if (amount != undefined) {
            if (type == 'Hipotecario') {
                if (Number(amount.target.value) < Number(providers.loanCalculation.maxAmounts.Hipotecario)) {
                    setAmountAllow(true);
                    setAmount(Number(amount.target.value))
                } else {
                    console.log("se paso h")
                    setAmountAllow(false);
                    setAmount(Number(0))
                }
            } else if (type === 'Fiduciario') {
                if (Number(amount.target.value) < Number(providers.loanCalculation.maxAmounts.Fiduciario)) {
                    setAmountAllow(true);
                    setAmount(Number(amount.target.value))
                } else {
                    console.log("se paso f")
                    setAmountAllow(false);
                    setAmount(Number(0))
                }
            } else {
                if (Number(amount.target.value) < Number(providers.loanCalculation.maxAmounts.Automovil)) {
                    setAmountAllow(true);
                    setAmount(Number(amount.target.value))
                } else {
                    console.log("se paso a")
                    setAmountAllow(false);
                    setAmount(Number(0))
                }
            }
        }
    }

    const a = () => {
        const items = []
        let saldo = 0;
        let totalCuota = 0;
        let interes = 0;
        console.log(Amount, Rate, Monthly)
        for (let i = 0; i < Terms; i++) {
            if (i == 0) {
                interes = ((Number(Amount) * Number(Rate)) / 12).toFixed(2);
                totalCuota = (Number(Monthly) + Number(interes)).toFixed(2);
                saldo = (Number(Amount) - Number(Monthly)).toFixed(2);
                items.push(<tr key={i}>
                    <td>{i + 1}</td>
                    <td>{Monthly}</td>
                    <td>{interes}</td>
                    <td>{totalCuota}</td>
                    <td>{saldo}</td>
                </tr>)
            } else {
                interes = ((Number(saldo) * Number(Rate)) / 12).toFixed(2);
                totalCuota = (Number(Monthly) + Number(interes)).toFixed(2);
                saldo = (Number(saldo) - Number(Monthly)).toFixed(2);
                if (saldo < 0) { saldo = 0 }
                items.push(<tr key={i}>
                    <td>{i + 1}</td>
                    <td>{Monthly}</td>
                    <td>{interes}</td>
                    <td>{totalCuota}</td>
                    <td>{saldo}</td>
                </tr>)
            }
        }

        return items
    }

    return (
        <>
            <Navbar style={{ background: providers.theme.headerBackgroundColor }}>
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

            <Container>
                <Row className="justify-content-md-center" style={{ marginTop: '4em' }}>
                    <Col lg="6" style={{ alignContent: 'center' }}>
                        <span style={{ marginLeft: '20%' }}>CALCULADORA</span>
                        {!AmountAllow && (
                            <Alert
                                width='9em'
                                className="mt-4 align-middle"
                                variant="danger"
                                onClose={() => setAmountAllow(false)}
                                dismissible
                                style={{ fontSize: "0.9em", color: "black" }}
                            >
                                <p>Monto no permitido por el tipo de Credito.</p>
                            </Alert>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{ marginTop: '4em' }}>
                    <Col sm={4}>
                        <DropdownButton
                            alignRight
                            title={type != "" ? type : "Seleccion tipo de credito"}
                            id="dropdown-menu-align-center"
                            onSelect={handleSelect}>
                            {
                                providers.loanCalculation.loanTypes != undefined ?
                                    renderTypes(providers.loanCalculation.loanTypes) : null
                            }
                        </DropdownButton>
                    </Col>
                    <Col sm={6} style={{ marginLeft: '2em' }}>
                        <span>Tasa del tipo de credito: {Rate}%</span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{ marginTop: '4em' }}>
                    <Col sm={4}>
                        <span>Monto del Credito</span>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl aria-label="Amount (to the nearest dollar)" onChange={e => handleAmount(e)} />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col sm={6} style={{ marginLeft: '2em' }}>
                        <span>Plazo del Credito</span>
                        <DropdownButton
                            alignRight
                            title={Terms != "" ? Terms : "Seleccion tipo de credito"}
                            id="dropdown-menu-align-center"
                            onSelect={handleSelectTerms}>
                            {
                                providers.loanCalculation.terms != undefined ?
                                    renderTerms(providers.loanCalculation.terms) : null
                            }
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="justify-content-md-center" style={{ marginTop: '2em' }}>
                    <Col xs lg="4">
                        <h2>
                            Cuota Mensual:  Q{Monthly}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table  striped bordered hover size="sm">
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
                                    a()
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

FormCredit.propTypes = {

}

const mapStateToProps = state => ({ providers: state.providers })

export default connect(mapStateToProps)(FormCredit);
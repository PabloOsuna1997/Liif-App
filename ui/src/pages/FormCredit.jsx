import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Alert, InputGroup, DropdownButton, Navbar, Container, Col, Row, Dropdown, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SelectCredit from '../components/SelectCredit'
import TableCuotes from '../components/TableCuotes'
import CardCalc from '../components/CardCalc'
import { useHistory } from 'react-router';


const FormCredit = ({ providers, addData }) => {
    const history = useHistory();
    const [Rate, setRate] = useState(0)
    const [type, setType] = useState('');
    const [AmountAllow, setAmountAllow] = useState(true)
    const [Terms, setTerms] = useState(0)
    const [Amount, setAmount] = useState(0)
    const [Monthly, setMonthly] = useState(0)
    const [OK, setOK] = useState(false)


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

    const cuotes = () => {
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

    const handlerSubmit = () => {
        if (type != "" && Monthly != 0 && Rate != 0 && Terms != 0) {
            setOK(false)
            const data = {
                type: type,
                monthly: Number(Monthly),
                rate: Number(Rate),
                term: Number(Terms)
            }

            addData(data)


            history.push('/calculator')
        } else {
            setOK(true)
        }
    }

    return (
        <div style={{
            color: providers.theme.fontColor,
            fontFamily: providers.theme.generalFont
        }}>
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
            <Row
                className="justify-content-md-center"
                style={{
                    marginTop: '4em'
                }}>
                <Col >
                    {
                        providers != undefined ?

                            <CardCalc providers={providers}
                                AmountAllow={AmountAllow}
                                setAmountAllow={setAmountAllow}
                                type={type}
                                handleSelect={handleSelect}
                                renderTypes={renderTypes}
                                Rate={Rate}
                                handleAmount={handleAmount}
                                Terms={Terms}
                                handleSelectTerms={handleSelectTerms}
                                renderTerms={renderTerms}
                                handlerSubmit={handlerSubmit} />
                            :
                            null
                    }
                    
                    { OK && (
                        <Alert
                            width='9em'
                            className="mt-4 align-middle"
                            variant="danger"
                            onClose={() => setOK(false)}
                            dismissible
                            style={{ fontSize: "0.9em", color: "black" }}
                        >
                            <p >Porfavor eliga una opcion en todos los campos.</p>
                        </Alert>
                    )}
                </Col>
                <Col>
                    <TableCuotes Monthly={Monthly} cuotes={cuotes} />
                </Col>
            </Row>
        </div>
    )
}

FormCredit.propTypes = {

}

const mapStateProps = state => ({ providers: state.providers })


const mapStateToProps = dispatchEvent => {
    return {
        addData: (value) => {
            dispatchEvent({ type: 'ADD_DATA', payload: value })
        }
    }
}

export default connect(mapStateProps, mapStateToProps)(FormCredit);
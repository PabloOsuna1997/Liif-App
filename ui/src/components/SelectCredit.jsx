import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Container, Col, Row, Spinner, Table, Form, Button, DropdownButton, Dropdown, Card } from 'react-bootstrap';

const SelectCredit = ({ handleSelect, loanTypes }) => {

    const renderTypes = (loanTypes) => {
        const render = loanType => (
            <Dropdown.Item eventKey={loanType}>{loanType}</Dropdown.Item>
        )

        return loanTypes.map(render)
    }

    return (
        <DropdownButton
            alignRight
            title="dassdf"
            id="dropdown-menu-align-center"
            onSelect={handleSelect()}>
            {
                loanTypes != undefined ?
                    renderTypes(loanTypes) : null
            }
        </DropdownButton>
    )
}

SelectCredit.propTypes = {

}

export default SelectCredit

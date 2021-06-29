import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-bootstrap'

const Select = ({ ProviderSelect, providers, onSelectHandler }) => {
    return (
        <Dropdown  onSelect={(ev) => onSelectHandler(ev)}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {
                    ProviderSelect != undefined ?
                    ProviderSelect.providerCode :
                    "Seleccione Tipo de Operador"
                }
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="0">{providers[0].providerName}</Dropdown.Item>
                <Dropdown.Item eventKey="1">{providers[1].providerName}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

Select.propTypes = {

}

export default Select

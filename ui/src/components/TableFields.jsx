import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Spinner, Table, Form, Button, Dropdown } from 'react-bootstrap';

const TableFields = ({ ProviderFields }) => {

console.log("fields", ProviderFields)
const renderFields = (fields) => {

    const render = Field => (
        <tr key={Field.code}>
            <td>{Field.code}</td>
            <td>{Field.title}</td>
            <td>{Field.type}</td>
            <td>{Field.maxLenght}</td>
            <td>{Field.required ? "true": "false"}</td>
            <td>options</td>
        </tr>
    )

    return fields.map(render)
}

return (
    ProviderFields != undefined ?
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>MaxLength</th>
                    <th>Required</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    renderFields(ProviderFields.fields)
                }
            </tbody>
        </Table>
        :
        null
)
}

TableFields.propTypes = {

}

export default TableFields

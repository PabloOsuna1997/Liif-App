import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap';

const TableTheme = ( { ProviderSelected }) => {
    return (
        ProviderSelected != undefined ?
        <Table striped bordered hover className="cardio">
            <thead>
                <tr>
                    <th>Componente</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>headerBackgroundColor</td>
                    <td>{ProviderSelected.headerBackgroundColor}</td>
                </tr>
                <tr>
                    <td>generalFont</td>
                    <td>{ProviderSelected.generalFont}</td>
                </tr>
                <tr>
                    <td>fontColor</td>
                    <td>{ProviderSelected.fontColor}</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>{ProviderSelected.fontSizes.title}</td>
                </tr>
                <tr>
                    <td>subTitle</td>
                    <td>{ProviderSelected.fontSizes.subTitle}</td>
                </tr>
                <tr>
                    <td>label</td>
                    <td>{ProviderSelected.fontSizes.label}</td>
                </tr>
                <tr>
                    <td>paragraph</td>
                    <td>{ProviderSelected.fontSizes.paragraph}</td>
                </tr>
            </tbody>
        </Table>
        :
        null
    )
}

TableTheme.propTypes = {

}

export default TableTheme

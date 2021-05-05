import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableFoot,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export default function ResourceTable({ columns, data }) {
    const rows = data.map(obj => {
        const row = []
        columns.map(({ data, options }) => {
            if (options) {
                const { isDate } = options
                if (isDate) {
                    row.push(new Date(obj[data]).toLocaleDateString('en-GB'))
                }
            } else {
                row.push(obj[data])
            }
        })
        return row
    })
    console.log(columns)
    console.log(rows)

    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    {columns.map(({ displayName }) => (
                        <TableCellHead key={`${displayName}-col`}>
                            {displayName}
                        </TableCellHead>
                    ))}
                </TableRowHead>
            </TableHead>
            <TableBody>
                {rows.map((row, i) => (
                    <TableRow key={`${i}-rows`}>
                        {row.map((data, j) => (
                            <TableCell key={`${i}-${j}-cell`}>{data}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            <TableFoot />
        </Table>
    )
}

ResourceTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

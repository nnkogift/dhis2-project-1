import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from '../styles.module.css'

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
    return (
        <Table className={classes['resource-table']}>
            <TableHead>
                <TableRowHead>
                    {columns.map(({ displayName }) => (
                        <TableCellHead key={`${displayName}-col`}>
                            {displayName}
                        </TableCellHead>
                    ))}
                </TableRowHead>
            </TableHead>
            <TableBody className={classes['table-body']}>
                {rows.map((row, i) => (
                    <TableRow key={`${i}-rows`}>
                        {row.map((data, j) => (
                            <TableCell key={`${i}-${j}-cell`}>{data}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

ResourceTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

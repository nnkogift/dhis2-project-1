import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from '../styles.module.css'
import ResourceTable from './ResourceTable'

export default function ResourcePage({ resource }) {
    const { title, query, columns, pathname, resource: res } = resource || {}
    const { loading, data, error } = useDataQuery(query)
    return (
        <div className={classes['resource-content']}>
            <h3>{i18n.t('{{title}}', { title })}</h3>
            <Divider />
            <div className={classes['resource-table']}>
                {loading && <div>Loading...</div>}
                {error && <div>{error.message || error.toString()}</div>}
                {data && (
                    <ResourceTable
                        columns={columns}
                        data={data[pathname][res]}
                    />
                )}
            </div>
        </div>
    )
}

ResourcePage.propTypes = {
    resource: PropTypes.object.isRequired,
}

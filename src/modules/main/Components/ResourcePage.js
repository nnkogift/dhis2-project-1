import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Divider, Pagination, Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import CenteredLoader from '../../../shared/CenteredLoader'
import ResourceForm from '../../../shared/ResourceForm'
import classes from '../styles.module.css'
import ResourceTable from './ResourceTable'

export default function ResourcePage({ resource }) {
    const { title, query, columns, pathname, resource: res, mutations } =
        resource || {}
    const [addOpen, setAddOpen] = useState()
    const { loading, data, error, refetch } = useDataQuery(query, {
        variables: {
            page: 1,
            pageSize: 10,
        },
    })

    const onPageChange = page => {
        refetch({ page })
    }

    const onPageSizeChange = pageSize => {
        refetch({ pageSize })
    }

    return (
        <div className={classes['resource-content']}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3>{i18n.t('{{title}}', { title })}</h3>
                <Button onClick={() => setAddOpen(true)} primary>
                    Add {title}
                </Button>
            </div>
            <Divider />
            <div className={classes['resource-table-container']}>
                {loading && <CenteredLoader />}
                {error && <div>{error.message || error.toString()}</div>}
                {data && (
                    <ResourceTable
                        columns={columns}
                        data={data[pathname][res]}
                        pager={data[pathname].pager}
                        setPage={onPageChange}
                        setPageSize={onPageSizeChange}
                    />
                )}
            </div>
            <div>
                <div className={classes['table-footer-container']}>
                    {data && (
                        <Pagination
                            onPageChange={onPageChange}
                            onPageSizeChange={onPageSizeChange}
                            {...data?.[pathname]?.pager}
                        />
                    )}
                </div>
            </div>
            {addOpen && (
                <ResourceForm
                    title={title}
                    resourceMutations={mutations}
                    onClose={() => setAddOpen(false)}
                    onSave={() => {
                        setAddOpen(false)
                        refetch()
                    }}
                />
            )}
        </div>
    )
}

ResourcePage.propTypes = {
    resource: PropTypes.object.isRequired,
}

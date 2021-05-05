import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import ResourcePage from './Components/ResourcePage'
import SideMenu from './Components/SideMenu'
import classes from './styles.module.css'

const resources = [
    {
        title: 'Programs',
        resource: 'programs',
        pathname: 'programs',
        query: {
            programs: {
                resource: 'programs',
                params: {
                    fields: ['id', 'displayName', 'lastUpdated'],
                },
            },
        },
        columns: [
            { displayName: 'ID', data: 'id' },
            { displayName: 'Name', data: 'displayName' },
            {
                displayName: 'Last Updated',
                data: 'lastUpdated',
                options: { isDate: true },
            },
        ],
    },
    {
        title: 'Indicators',
        resource: 'indicators',
        pathname: 'indicators',
        query: {
            indicators: {
                resource: 'indicators',
                params: {
                    fields: ['id', 'displayName', 'lastUpdated'],
                },
            },
        },
        columns: [
            { displayName: 'ID', data: 'id' },
            { displayName: 'Name', data: 'displayName' },
            {
                displayName: 'Last Updated',
                data: 'lastUpdated',
                options: { isDate: true },
            },
        ],
    },
]

export default function ResourceManager() {
    return (
        <div className={classes.container}>
            <MemoryRouter initialIndex={0} initialEntries={resources}>
                <div className={classes['side-menu']}>
                    <SideMenu resources={resources} />
                </div>
                <div className={classes.content}>
                    {resources.map(res => {
                        return (
                            <Route key={res.pathname} path={res.pathname}>
                                <ResourcePage resource={res} />
                            </Route>
                        )
                    })}
                </div>
            </MemoryRouter>
        </div>
    )
}

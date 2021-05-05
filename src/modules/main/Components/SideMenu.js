import { Menu, MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classes from '../styles.module.css'

const sideMenu = function SideMenu({ resources }) {
    const history = useHistory()
    const { pathname: currentPathname } = useLocation()
    return (
        <div>
            <h4 className={classes['side-menu-title']}>Select Resource</h4>
            <Menu>
                {resources?.map(({ title, pathname }) => (
                    <div key={`${pathname}`} className={classes['menu-item']}>
                        <MenuItem
                            label={title}
                            onClick={() => history.replace(pathname)}
                            active={pathname === currentPathname}
                        />
                    </div>
                ))}
            </Menu>
        </div>
    )
}
export default sideMenu

sideMenu.propTypes = {
    resources: PropTypes.arrayOf(Object),
}

import { CenteredContent, CircularLoader } from '@dhis2/ui'
import React from 'react'

export default function CenteredLoader() {
    return (
        <CenteredContent>
            <CircularLoader small />
        </CenteredContent>
    )
}

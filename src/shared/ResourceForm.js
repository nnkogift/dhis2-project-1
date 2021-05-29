import { useAlert, useDataMutation } from '@dhis2/app-runtime'
import {
    Modal,
    ReactFinalForm,
    InputFieldFF,
    ModalContent,
    Button,
    ModalActions,
    ModalTitle,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import classes from './styles/modal.css'

export default function ResourceForm({
    onClose,
    onSave,
    resource,
    resourceMutations,
    title,
}) {
    const [mutate, { loading: saving }] = useDataMutation(
        resource ? resourceMutations.update : resourceMutations.create,
        {
            onComplete: () => {
                show({
                    message: `${title} added successfully`,
                    type: { success: true },
                })
                onSave()
            },
            onError: e => {
                show({
                    message: e.message || e.toString(),
                    type: { critical: true },
                })
            },
        }
    )
    const formRef = useRef()
    const required = value => (value ? undefined : 'Required')
    const { show } = useAlert(
        ({ message }) => message,
        ({ type }) => ({ ...type, duration: 3000 })
    )

    const onSubmit = data => {
        mutate({ data })
    }

    const { Form, Field } = ReactFinalForm
    return (
        <Modal onClose={onClose}>
            <ModalTitle>
                {resource ? 'Edit' : 'Add'} {title}
            </ModalTitle>
            <ModalContent>
                <Form onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <form
                            method="post"
                            ref={formRef}
                            onSubmit={event => {
                                event.preventDefault()
                                handleSubmit(event)
                            }}
                        >
                            <Field
                                className={classes['field']}
                                initialValue={resource?.name}
                                component={InputFieldFF}
                                name={'name'}
                                validate={required}
                                label="Name"
                            />
                            <Field
                                className={classes['field']}
                                initialValue={resource?.shortName}
                                component={InputFieldFF}
                                name={'shortName'}
                                validate={required}
                                label="Short Name"
                            />
                        </form>
                    )}
                </Form>
            </ModalContent>
            <ModalActions>
                <Button className={classes['action-button']} onClick={onClose}>
                    Hide
                </Button>
                <Button
                    className={classes['action-button']}
                    primary
                    onClick={() => {
                        formRef.current?.requestSubmit()
                    }}
                >
                    {saving ? 'Saving...' : 'Save'}
                </Button>
            </ModalActions>
        </Modal>
    )
}

ResourceForm.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    resource: PropTypes.object,
    resourceMutations: PropTypes.object,
    onSave: PropTypes.func,
}

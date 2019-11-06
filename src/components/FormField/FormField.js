import React from 'react'
import { Form } from 'react-bootstrap';

const formField = (props) => (
    <Form.Group controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.change} />
    </Form.Group>
)
export default formField
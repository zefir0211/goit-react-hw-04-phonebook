import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Span, Input, Button, Form } from './contactForm.styled';

const BASE_STATE = {
    name: '',
    number: '',
};

const ContactForm = ({ newContact }) => {
const [{ name, number }, setState] = useState(BASE_STATE);

function onChange  (event)  {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }))
};

const onSubmit = event => {
    event.preventDefault();
    const newContacts = {
        id: nanoid(5),
        name,
        number,
    };
    const isUnique = newContact(newContacts);

    if (isUnique) {
        setState({ ...BASE_STATE });
    }
};

    return (
    <Form onSubmit={onSubmit}>
        <label htmlFor="name">
        <Span>Name</Span>
        <Input
            onChange={onChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Rosie Simpson"
        />
        </label>
        <label htmlFor="number">
            <Span>Number</Span>
            <Input
            onChange={onChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="645-17-79"
        />
        </label>
        <Button type="submit">Add contact</Button>
    </Form>
    );
};

ContactForm.propTypes = {
    newContact: PropTypes.func.isRequired,
};
export default ContactForm;
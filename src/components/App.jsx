import React, { useState, useEffect } from 'react';
import Filter from './phoneBook/filter/filter';
import ContactForm from './phoneBook/contactForm/contactForm';
import ContactList from './phoneBook/contactList/contactList';
import { Section, Container, Div, H1, DivList, H2 } from './App.styled';

const L_KEY = 'contacts-list';
const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(L_KEY)) ?? contactsList
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(L_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const newContacts = newObj => {
  const lowercaseNames = contacts.map(contact => contact.name.toLowerCase());
  const newName = newObj.name.toLowerCase();

  if (lowercaseNames.includes(newName)) {
    alert(`${newObj.name} уже есть в списке контактов`);
    return false;
    }
    setContacts(prevState => [...prevState, newObj]);
    return true;
  };

  const onCahangeFilter = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const contactFilter = () => {
    if (filter === '') {
      return false;
    }
    return contacts.filter(x => x.name.toLowerCase().includes(filter));
  };

  const deleteContacts = event => {
    setContacts(prevState => prevState.filter(x => x.id !== event.target.name));
  };

  const fillter = contactFilter();
    return (
      <Section>
        <Container>
          <Div>
            <H1>Phonebook</H1>
            <ContactForm newContact={newContacts} />
          </Div>

          <DivList>
            <H2>Contacts</H2>
            <Filter onChange={onCahangeFilter} />
            <ContactList
              contacts={fillter ? fillter : contacts}
              deleteContacts={deleteContacts}
            />
          </DivList>
        </Container>
      </Section>
    );
}
export default App;
import { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { Box } from '../Box';
import { Title, Contacts, Phonebook, Filter } from 'components';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Hermione qwe', number: '443-89-22' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const localStorageContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(localStorageContacts);

  const [contacts, setContacts] = useState(
    () => parsedContacts ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [newContact, ...contacts]);
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleFilterContacts = useMemo(() => {
    console.log('handleFilterContacts');

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const onDeleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };


  return (
    <Box
      mx="auto"
      my="100px"
      p={3}
      width="500px"
      border="1px solid rgba(0, 0, 0, 0.2)"
      borderRadius="5px"
      boxShadow="0 3px 7px rgba(0, 0, 0, 0.3)"
    >
      <h1 className="visually-hidden">Phonebook</h1>

      <Box>
        <Title text="phonebook" />

        <Phonebook existedContacts={contacts} addContact={addContact} />
      </Box>

      <Box mt={3}>
        <Title text="contacts" />

        <Filter onChange={onFilterChange} value={filter} />

        <Contacts
          contacts={handleFilterContacts}
          deleteContact={onDeleteContact}
        />
      </Box>
    </Box>
  );
};

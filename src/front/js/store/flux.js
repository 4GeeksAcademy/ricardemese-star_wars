const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			host_swapi: 'https://www.swapi.tech/api/',
			characters: [],
			character: null,
			planets: [],
			planet: null,
			starships: [],
			contacts: [],
			contactError: null,
			favorites: [],
			alert: { text: '', background: '', visible: false, }
		},

		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo });
			},

			//Characters
			getCharacters: async () => {
				try {
					const response = await fetch(`${getStore().host_swapi}/people`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ characters: data.results });
					localStorage.setItem('characters', JSON.stringify(data.results));
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching characters',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			getCharacterById: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ character: data.result.properties });
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching character details',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			//Planets
			getPlanets: async () => {
				try {
					const response = await fetch(`${getStore().host_swapi}/planets`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ planets: data.results });
					localStorage.setItem('planets', JSON.stringify(data.results));
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching planets',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			getPlanetById: async (id) => {
				try {
					const response = await fetch(`${getStore().host_swapi}/planets/${id}`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ planet: data.result.properties });
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching planet details',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			//Starships
			getStarships: async () => {
				try {
					const response = await fetch(`${getStore().host_swapi}/starships`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ starships: data.results });
					localStorage.setItem('starships', JSON.stringify(data.results));
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching starships',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			getStarshipById: async (id) => {
				try {
					const response = await fetch(`${getStore().host_swapi}/starships/${id}`);
					if (!response.ok) {
						setStore({
							alert: {
								text: 'Error loading data from API',
								background: 'danger',
								visible: true
							}
						});
						return;
					}
					const data = await response.json();
					setStore({ starship: data.result.properties });
				} catch (error) {
					setStore({
						alert: {
							text: 'Error fetching starship details',
							background: 'danger',
							visible: true
						}
					});
				}
			},

			//Add Favorites
			addFavorites: (newFavorite) => {
				const store = getStore();
				const favorites = [...store.favorites];
				const isAlreadyFavorite = favorites.some(favorite => favorite.name === newFavorite.name && favorite.type === newFavorite.type);

				if (!isAlreadyFavorite) {
					favorites.push(newFavorite);
					setStore({ favorites });
				}
			},
			//Remove Favorites
			removeFavorites: (itemToRemove) => {
				const store = getStore();
				const favorites = store.favorites.filter(favorite => !(favorite.name === itemToRemove.name && favorite.type === itemToRemove.type));
				setStore({ favorites });
			},

			//Contacts
			getContact: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/ricardemese/contacts');
					if (!response.ok) {
						throw new Error('Error fetching contacts');
					}
					const data = await response.json();
					if (Array.isArray(data.contacts)) {
						setStore({ contacts: data.contacts });
					} else {
						console.error('Expected data to be an array, but it is not.');
					}
				} catch (error) {
					console.error('Error fetching contacts:', error);
					setStore({ contactError: error.message });
				}
			},

			createContact: async (contact) => {
				try {
					const resp = await fetch('https://playground.4geeks.com/contact/agendas/ricardemese/contacts', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							name: contact.name,
							phone: contact.phone,
							email: contact.email,
							address: contact.address,
						}),
					});

					console.log("Status: ", resp.status);
					if (!resp.ok) throw new Error('Error creating contact');

					const data = await resp.json();
					console.log("Data from API: ", data);

					const store = getStore();
					if (Array.isArray(store.contacts)) {
						setStore({ contacts: [...store.contacts, data] });
					} else {
						console.error('Expected store.contacts to be an array, but it is not.');
					}
				} catch (error) {
					console.error("Error: ", error.message);
					setStore({ contactError: error.message });
				}
			},

			addContact: (newContact) => {
				const store = getStore();
				setStore({ contacts: [...store.contacts, newContact] });
			},

			updateContact: async (contactId, updatedInfo) => {
				try {
					const resp = await fetch(`https://playground.4geeks.com/contact/agendas/ricardemese/contacts/${contactId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedInfo),
					});
					if (!resp.ok) throw new Error('Network response was not ok');
					const updatedContact = await resp.json();
					console.log('Updated contact:', updatedContact);

					const store = getStore();
					const updatedContacts = store.contacts.map(contact =>
						contact.id === contactId ? updatedContact : contact
					);

					setStore({
						contacts: updatedContacts,
					});
				} catch (error) {
					setStore({ contactError: error.message });
				}
			},

			deleteContact: async (contact) => {
				try {
					console.log("Received contact for deletion:", contact);
					if (!contact || !contact.id) throw new Error('Contact ID is undefined');

					console.log("Deleting contact with ID:", contact.id);
					const resp = await fetch(`https://playground.4geeks.com/contact/agendas/ricardemese/contacts/${contact.id}`, {
						method: 'DELETE',
					});
					console.log("Response status:", resp.status);

					if (!resp.ok) throw new Error('Network response was not ok');

					const updatedContacts = getStore().contacts.filter(c => c.id !== contact.id);
					setStore({ contacts: updatedContacts });
				} catch (error) {
					setStore({ contactError: error.message });
					console.error('Error deleting contact:', error);
				}
			},

			setContacts: (contacts) => {
				setStore({ contacts });
			},

		}
	}
};


export default getState;
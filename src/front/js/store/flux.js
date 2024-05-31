import { Planets } from "../component/Planets.jsx";
import { Characters } from "../component/Characters.jsx";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			users: '',
			cohorte: 'Spain-65',
			character: [],
			currentCharacter: '',
			planet: [],
			currentPlanet: '',
			starships: [],
            currentStarship: '',
			starshipDetails: {},
			counter: 0,
			favorites: ['Anais'],
			apiContact: 'https://playground.4geeks.com/contact/',
			agenda: 'spain-65',
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			deleteContact: async (id) => {
				const uri = `${getStore().apiContact}agendas/${getStore().agenda}/contacts/${id}`;

				const response = await fetch(uri, {
					method: 'DELETE'
				});
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}
				getActions().getContacts();
				console.log("Deleted contact. Updating contacts list...");
			},
			
			updateContact: async (id, dataToSend) => {
                const uri = `${getStore().apiContact}agendas/${getStore().agenda}/contacts/${id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
                getActions().getContacts();
            },

			addContact: async (dataToSend) => {
				console.log(dataToSend);
				const uri = getStore().apiContact + 'agendas/' + getStore().agenda + '/contacts';
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				getActions().getContacts();
			},

			getContacts: async () => {
				const uri = getStore().apiContact + 'agendas/' + getStore().agenda + '/contacts';
				// console.log(uri);
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({contacts: data.contacts})
				console.log('Data contacts', data.contacts)
			},

			getStarships: async () => {
                    const response = await fetch('https://www.swapi.tech/api/starships');
                    if (!response.ok) {
                        console.log('Error al obtener las naves espaciales:', response.status, response.statusText);
                        return;
                    }
                    const data = await response.json();
					console.log('Starships', data.results);
                    setStore({ starships: data.results })
			},

			getStarshipDetails: async (id) => { // Nueva acción
                const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                const data = await response.json();
                setStore({ starshipDetails: { ...getStore().starshipDetails, [id]: data.result.properties } });
            },

			getPlanets: async () => {
				const response = await fetch ('https://swapi.dev/api/planets');
				if (!response.ok) {
					console.log('Error no hay na', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log('Dentro de data planeta', data);
				setStore({planet: data.results})
			},

			getCharacters: async () => {
				const response = await fetch ('https://swapi.dev/api/people');
				if (!response.ok) {
					console.log('Error no hay na');
					return
				}
				const data = await response.json();
				console.log('Dentro de data', data);
				setStore({character: data.results})
			},
			settingCharacter: (user) => {setStore({currentCharacter: character})}, //PARECE QUE ESTO NO ESTA FUNCIONANDO


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.text()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			addFavorites: (newFavorite) => {setStore({favorites: [...getStore().favorites, newFavorite]})},
			removeFavorites: (removeFavorite) => {
				setStore({favorites: getStore().favorites.filter((item) => item != removeFavorite)})
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			

		}
	};
};

export default getState;

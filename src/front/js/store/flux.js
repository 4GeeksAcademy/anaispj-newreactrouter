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
            favorites: [''],
            token: null,
            isLoggedIn: false,
            user: null
        },
        actions: {
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

            getStarshipDetails: async (id) => {
                const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                const data = await response.json();
                setStore({ starshipDetails: { ...getStore().starshipDetails, [id]: data.result.properties } });
            },

            getPlanets: async () => {
                const response = await fetch('https://swapi.dev/api/planets');
                if (!response.ok) {
                    console.log('Error no hay na', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                console.log('Dentro de data planeta', data);
                setStore({ planet: data.results })
            },

            getCharacters: async () => {
                const response = await fetch('https://swapi.dev/api/people');
                if (!response.ok) {
                    console.log('Error no hay na');
                    return;
                }
                const data = await response.json();
                console.log('Dentro de data', data);
                setStore({ character: data.results })
            },

            settingCharacter: (character) => { setStore({ currentCharacter: character }) },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.text()
                    setStore({ message: data.message })
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },

            addFavorites: (newFavorite) => {
                const store = getStore();
                if (!store.favorites.includes(newFavorite)) {
                    setStore({ favorites: [...store.favorites, newFavorite] });
                } else {
                    setStore({ favorites: store.favorites.filter((item) => item !== newFavorite) });
                }
            },

            removeFavorites: (removeFavorite) => {
                setStore({ favorites: getStore().favorites.filter((item) => item !== removeFavorite) });
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            signup: async (email, password) => {
                const uri = process.env.BACKEND_URL + '/api/signup';
                const response = await fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                if (!response.ok) {
                    console.log("Error al iniciar sesion carahuevo", response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                if (data.success) {
                    window.location.href = '/login';
                }
            },

            login: async (email, password) => {
                const url = process.env.BACKEND_URL + '/api/login';
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.access_token) {
                        setStore({ token: data.access_token, isLoggedIn: true, user: data.results });
                        sessionStorage.setItem('token', data.access_token);
                        sessionStorage.setItem('user', JSON.stringify(data.results));
                        return data;
                    }
                } else {
                    console.log("Error al iniciar sesión:", response.status, response.statusText);
                    return null;
                }
            },

            logout: () => {
                setStore({ token: null, isLoggedIn: false, user: null });
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
    };
};

export default getState;
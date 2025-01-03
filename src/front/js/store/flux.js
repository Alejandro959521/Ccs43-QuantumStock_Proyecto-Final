import { toast } from "sonner";

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

			token: localStorage.getItem("token") ?? null,
			info: {},
			almacen: [],
			product: [],
			cliente: [],
			orden: [],
			reporte: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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

			create_token: async (event, email, password) => {
				const store = getStore()
				event.preventDefault()
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						body: JSON.stringify({
							"email": email,
							"password": password
						}),
						headers: {
							"content-type": "Application/json"
						}

					})

					if (response.ok) {
						const body = await response.json()
						/* console.log(body) */
						setStore({ token: body.token })
						// console.log("este es el token",store.token) 
						localStorage.setItem("token", body.token)
						

						return true
					}
				} catch (error) {

					console.log(error)

					return false
				}

			},

			getUser: async () => {

				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/user", {
						method: "GET",

						headers: {
							Authorization: ` Bearer ${store.token}`,
						}

					})
					if (response.ok) {

						const body = await response.json()

						/* console.log(body) */
						setStore({ info: body })

						return true
					}
					// console.log("esto es store.info",store.info) 

				} catch (error) {

					console.log(error)
				}
			},

			setToken: (token) => {

				setStore({ token })
			},

			logOut: () => {
				localStorage.removeItem("token");
				setStore({ token: null })
			},



			getProduct: async () => {

				const store = getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/products", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.token}`
						},
					})
					if (response.ok) {
						const body = await response.json()
						setStore({ product: body })
					}
				} catch (error) {
					console.log(error)
				}
			},

			putProduct: async ({ id, product_name, description, item, price, admission_date }) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + `api/product/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"product_name": product_name,
							"description": description,
							"item": item,
							"price": price,
							"admission_date": admission_date
						})
					})
					if (response.ok) {
						const actions = getActions()
						actions.getProduct()
						toast.success("Se actualizo correctamente")
					}
				} catch (error) {
					console.log(error)
				}



			},

			deleteProduct: async (product_id) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + `api/delete/product/${product_id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(

						)
					})
					if (response.ok) {
						const actions = getActions()
						actions.getProduct()
						toast.success("Se elimino exitosamente")
					}
				} catch (error) {
					console.log(error)
				}
			},

			getStock: async () => {
				const store = getStore()

				try {
					const response = await fetch(process.env.BACKEND_URL + "api/user/store", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.token}`
						},
					})
					if (response.ok) {
						const body = await response.json()
						setStore({ almacen: body })
						/* console.log("store en el flux:", store.almacen) */
					}
				} catch (error) {
					console.log(error)
				}
			},

			putStock: async ({ id, name_Stock, address, rif }) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + `api/stock/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"name_Stock": name_Stock,
							"address": address,
							"rif": rif

						})
					})
					if (response.ok) {
						const actions = getActions()
						actions.getStock()
						toast.success("Se actualizo correctamente")
					}
				} catch (error) {
					console.log(error)
				}



			},

			deleteStock: async () => {
				const store = getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/delete/stock", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.token}`
						},
						body: JSON.stringify(

						)
					})
					if (response.ok) {
						const actions = getActions()
						actions.getStock()
						toast.success("Su almacen a sido eliminado")
					}
				} catch (error) {
					console.log(error)
				}
			},


			getClient: async () => {
				const store = getStore()

				try {
					const response = await fetch(process.env.BACKEND_URL + "api/clients", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.token}`
						},
					})
					if (response.ok) {
						const body = await response.json()
						setStore({ cliente: body })
						/* console.log("store en el flux:", store.almacen) */
					}
				} catch (error) {
					console.log(error)
				}
			},

			putClient: async ({ id, name_client, address_client, email_client, phone_client }) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + `api/update/client/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"name_client": name_client,
							"address_client": address_client,
							"email_client": email_client,
							"phone_client": phone_client

						})
					})
					if (response.ok) {
						const actions = getActions()
						actions.getClient()
						toast.success("Se actualizo correctamente")
					}
				} catch (error) {
					console.log(error)
				}



			},

			deleteClient: async (client_id) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + `api/delete/client/${client_id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(

						)
					})
					if (response.ok) {
						const actions = getActions()
						actions.getClient()
						toast.success("Se elimino correctamente")
					}
				} catch (error) {
					console.log(error)
				}
			},

			/* 			getReport: async () => {
							const store = getStore()
			
							try {
								const response = await fetch(process.env.BACKEND_URL + "api/reports", {
									method: "GET",
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${store.token}`
									},
								})
								if (response.ok) {
									const body = await response.json()
									setStore({ reporte: body })
									
								}
							} catch (error) {
								console.log(error)
							}
						}, */

		}
	};
};

export default getState;
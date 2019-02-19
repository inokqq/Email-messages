import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		messages: [],
		message: {},
	},
	getters: {
		sortedMessages(state) {
			return state.messages.sort((a, b) => {
				if (a.received_at < b.received_at) return 1
				else if (a.received_at > b.received_at) return -1
				else return 0
			})
		}
	},
	mutations: {
		setMessages(state, {message, data}) {
			const commonMessage = {...message, ...data}
			state.messages.push(commonMessage)
		},
		clearMessages(state) {
			state.messages = []
		},
		setMessage(state, message) {
			state.message = message
		}
	},
	actions: {
		getMessageList: async ({dispatch, commit}) => {
			commit('clearMessages')
			try {
				const {data} = await Axios({
					method: 'GET',
					url: 'https://fmail.flyaps.com/api/v1/mailbox/messages/',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				dispatch('getMessagesById', data)
			} catch (error) {
				console.log(error)
			}
		},
		getMessagesById: ({commit}, messages) => {
			try {
				messages.forEach(async message => {
					const {data} = await Axios({
						method: 'GET',
						url: `https://fmail.flyaps.com/api/v1/mailbox/messages/${message.id}/`,
						headers: {
							'Content-Type': 'application/json'
						}
					})
					commit('setMessages', {message, data})
				})
			} catch (error) {
				console.log(error)
			}
		},
		getMessageById: async ({commit}, id) => {
			try {
				const {data} = await Axios({
					method: 'GET',
					url: `https://fmail.flyaps.com/api/v1/mailbox/messages/${id}/`,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				commit('setMessage', data)
			} catch (e) {
				console.log(e)
			}
		}
	}
})

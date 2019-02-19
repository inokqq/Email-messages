<template>
	<div>
		<v-container grid-list-md>
			<v-layout row wrap v-for="message in messages"
								:key="message.id"
								class="mail-wrapper"
								:class="message.is_read ? 'read' : 'unread' ">
				<v-flex xs1>
					<svg class="star"
							 :class="message.important ? 'important' : '' "
							 @click="changeImportantStatus(message.id)">
						<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
					</svg>
				</v-flex>
				<v-flex xs11 @click="changeReadStatus(message.id)">
					<router-link class='messages-list' :to='`/message/${message.id}`'>
						<v-flex xs1>
							{{message.from_message}}
						</v-flex>
						<v-flex xs1>
							{{message.subject}}
						</v-flex>
						<v-flex xs2>
							{{message.preheader}}
						</v-flex>
						<v-flex xs1>
							{{message.received_at | date}}
						</v-flex>
					</router-link>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		computed: {
			messages() {
				return this.$store.getters.sortedMessages
			}
		},
		methods: {
			changeImportantStatus(id) {
				for (let i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id === id) {
						this.messages[i].important = !this.messages[i].important
					}
				}
			},
			changeReadStatus(id) {
				for (let i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id === id) {
						this.messages[i].is_read = true
					}
				}
			}
		},
		filters: {
			date(value) {
				if (!value) return value
				const [date] = value.split('T')
				const [year, month, day] = date.split('-')
				return `${day}-${month}-${year}`
			}
		}
	}
</script>
<style lang="scss">
	.unread {
		color: black;
		font-weight: bold;
	}

	.read {
		color: gray;
	}

	.mail-wrapper {
		border: 1px solid black;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.container.grid-list-md .layout:not(:only-child) {
		margin-bottom: 5px;
	}

	.star {
		width: 25px;
		height: 25px;
		polygon {
			fill: lightgrey;
		}
	}

	.important {
		polygon {
			fill: black;
		}
	}

	.v-dialog--fullscreen {
		background-color: white;
	}

	.messages-list {
		display: flex;
		justify-content: space-between;
		text-decoration: none;
		color: inherit;
	}

</style>



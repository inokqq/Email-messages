<template>
	<div>
		<v-container grid-list-md>
			<v-layout row wrap>
				<v-flex xs1>
					Body:
				</v-flex>
				<v-flex xs2>
					{{message.body}}
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs1>
					To:
				</v-flex>
				<v-flex xs2>
					{{message.to}}
				</v-flex>
			</v-layout>
            <v-layout row wrap>
				<v-flex xs1>
					Cc:
				</v-flex>
				<v-flex xs2>
					{{message.cc}}
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs1>
					Bcc:
				</v-flex>
				<v-flex xs2>
					{{message.bcc}}
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
export default {
	computed: {
		message() {
			return this.$store.state.message;
		}
	},
	created() {
		this.$store.dispatch('getMessageById', this.$route.params.id)
	}
}
</script>

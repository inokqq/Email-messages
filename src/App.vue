<template>
	<v-app class="app" id="app">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</v-app>
</template>

<script>

	export default {
		created() {
			this.$store.dispatch('getMessageList');
		},
	}
</script>


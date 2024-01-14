<script>

// Компоненты
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		NavBar,
		RouterView
	}
};


</script>

<template>
	<div class="app">
		<div class="row">
			<div class="col-3">
				<!-- Левая колонка -->
				<nav-bar></nav-bar>
			</div>
			<div class="col-9">
				<!-- Правая колонка -->
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style>
.app {
	padding: 15px;
}
</style>

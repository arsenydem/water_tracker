import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import CreatePage from './views/CreatePage.vue';
import NotesPage from './views/NotesPage.vue';
import StatisticsPage from './views/StatisticsPage.vue';

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'create',
            component: CreatePage,
        },
        {
            path: '/notes',
            name: 'notes',
            component: NotesPage
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: StatisticsPage
        }
    ]
})
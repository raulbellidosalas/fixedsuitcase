/**
 * @fileoverview Router configuration for the ACME Learning Center application
 * Defines all routes and navigation behavior for the application
 */

import {createRouter, createWebHistory} from "vue-router";
/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */
const HomeComponent = () => import('../public/pages/home.component.vue');
const PageNotFoundComponent = () => import('../public/pages/not-found.component.vue');
const CheckInComponent=()=>import('../registration/pages/check-in.component.vue');
const routes = [
    { path: '/registration/event-check-ins/new', component: CheckInComponent },
    {   path: '/home',                  name: 'home',       component: HomeComponent,               meta: {title: 'Home'}},
    {   path: '/',                      name: 'default',    redirect: {name: 'home'}},
    {   path: '/:pathMatch(.*)*',       name: 'not-found',  component: PageNotFoundComponent,       meta: {title: 'Page not found'}},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});



export default router;
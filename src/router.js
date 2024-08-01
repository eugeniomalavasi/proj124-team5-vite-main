import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import ResultsPage from "./pages/ResultsPage.vue";
import SearchPage from "./pages/SearchPage.vue";
import SingleResultPage from "./pages/SingleResultPage.vue";
import NotFound from "./components/NotFound.vue";
import AboutUs from "./pages/AboutUs.vue";


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomePage,
		},
		{
			path: "/login",
			name: "login",
			beforeEnter() {
				// Redirect to the Laravel login page
				window.location.href = "http://127.0.0.1:8000/";
			},
		},
		{
			path: "/search",
			name: "search",
			component: SearchPage,
		},
		{
			path: "/results",
			name: "SearchResults",
			component: ResultsPage,
			props: (route) => ({ query: route.query.q }),
		},
		{
			path: "/single-result/:slug",
			name: "single-result",
			component: SingleResultPage,
			props: true,
		},
		{
			path: "/apartment/:slug",
			name: "single-result",
			component: SingleResultPage,
			props: true,
		},
		{
			path: "/:notFound",
			name: "notFound",
			component: NotFound
		},
		{
			path: "/about",
			name: "about",
			component: AboutUs,
		}
	],
});

export { router };

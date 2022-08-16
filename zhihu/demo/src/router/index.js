import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailsView from "../views/DetailsView.vue";
import ExtraView from "../views/ExtraView.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/details/:storyid",
        name: "details",
        props:true,
        component: DetailsView,
    },
    {
        path: "/extra/:extraid",
        name: "extra",
        props:true,
        component: ExtraView,
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});
// router.afterEach((to,from,next)=>{
//     window.scrollTo(0.0);
// });

export default router;

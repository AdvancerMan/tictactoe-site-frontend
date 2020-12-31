import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import Index from "@/components/Index";
import NotFound404 from "@/components/NotFound404";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import TicTacToeGame from "@/components/ticTacToe/Game";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/hello',
        name: 'hello',
        component: HelloWorld
    },
    {
        path: '/ticTacToe',
        redirect: {name: 'ticTacToe-lobby'}
    },
    {
        path: '/ticTacToe/lobby',
        name: 'ticTacToe-lobby',
        component: TicTacToeGame
    },
    {
        path: '/ticTacToe/create',
        name: 'ticTacToe-create',
        component: TicTacToeGame
    },
    {
        path: '/ticTacToe/play/:id',
        name: 'ticTacToe-play',
        component: TicTacToeGame
    },
    {
        path: '*',
        component: NotFound404
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next()
});

router.afterEach(() => {
    NProgress.done()
})

export default router

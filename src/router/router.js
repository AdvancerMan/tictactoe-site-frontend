import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import Index from "@/components/Index";
import {isAuthenticated} from "@/requests";
import Login from "@/components/credentials/Login";
import Register from "@/components/credentials/Register";
import NotFound404 from "@/components/NotFound404";
import TicTacToeGameHistory from "@/components/ticTacToe/History";
import TicTacToePlay from "@/components/ticTacToe/Play";
import TicTacToeLobby from "@/components/ticTacToe/Lobby";
import TicTacToeRoom from "@/components/ticTacToe/Room";
import TicTacToeCreate from "@/components/ticTacToe/Create";
import TicTacToe from "@/components/ticTacToe/TicTacToe";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/ticTacToe',
        redirect: {name: 'ticTacToe-lobby'},
        component: TicTacToe,
        children: [
            {
                path: 'lobby',
                name: 'ticTacToe-lobby',
                component: TicTacToeLobby,
                props: route => ({
                    page: route.query.page,
                    count: route.query.count,
                }),
            },
            {
                path: 'create',
                name: 'ticTacToe-create',
                component: TicTacToeCreate,
            },
            {
                path: 'game/:id',
                name: 'ticTacToe-room',
                component: TicTacToeRoom,
                props: true,
            },
            {
                path: 'game/:id/play',
                name: 'ticTacToe-play',
                component: TicTacToePlay,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'game/:id/history',
                name: 'ticTacToe-history',
                component: TicTacToeGameHistory,
                props: true,
            },
        ]
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

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        // TODO friendly alert that page requires login
        alert("Login required");
        next({name: 'login'});
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});


function getRootNavLinks() {
    return [
        ['index', 'Home'],
        ['ticTacToe-lobby', 'Tic Tac Toe'],
    ];
}

export let initNavLinks = [];

router.beforeEach((to, from, next) => {
    let getNavLinks = undefined;
    for (const route of to.matched.slice().reverse()) {
        const methods = route.components.default.methods;
        if (methods !== undefined) {
            getNavLinks = methods.getNavLinks;
            if (getNavLinks !== undefined) {
                break
            }
        }
    }
    const navLinks = getNavLinks === undefined ? getRootNavLinks() : getNavLinks();

    if (window.vue === undefined) {
        initNavLinks = navLinks;
    } else {
        window.vue.navLinks = navLinks;
    }

    next();
});

export default router;

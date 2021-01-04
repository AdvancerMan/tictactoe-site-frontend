import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/components/Index";
import NotFound404 from "@/components/NotFound404";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import TicTacToeGameHistory from "@/components/ticTacToe/History";
import TicTacToePlay from "@/components/ticTacToe/Play";
import Login from "@/components/credentials/Login";
import Register from "@/components/credentials/Register";
import {isAuthenticated} from "@/requests";

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
    // { TODO
    //     path: '/ticTacToe',
    //     redirect: {name: 'ticTacToe-lobby'}
    // },
    // { TODO
    //     path: '/ticTacToe/lobby',
    //     name: 'ticTacToe-lobby',
    //     component:
    // },
    // { TODO
    //     path: '/ticTacToe/create',
    //     name: 'ticTacToe-create',
    //     component:
    // },
    // { TODO
    //     path: '/ticTacToe/game/:id',
    //     name: 'ticTacToe-room',
    //     component:
    // },
    {
        path: '/ticTacToe/game/:id/play',
        name: 'ticTacToe-play',
        component: TicTacToePlay,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ticTacToe/game/:id/history',
        name: 'ticTacToe-history',
        component: TicTacToeGameHistory,
        props: true,
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
    if (to.meta.requiresAuth) {
        if (isAuthenticated()) {
            next();
        } else {
            // TODO friendly alert that page requires login
            alert("Login required");
            next({name: 'login'});
        }
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done()
})

export default router

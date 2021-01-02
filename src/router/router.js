import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import Index from "@/components/Index";
import NotFound404 from "@/components/NotFound404";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import TicTacToeGameHistory from "@/components/ticTacToe/History";

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
    // { TODO
    //     path: '/ticTacToe/game/:id/play',
    //     name: 'ticTacToe-play',
    //     component: ,
    //     props: true,
    // },
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

router.afterEach(() => {
    NProgress.done()
})

export default router

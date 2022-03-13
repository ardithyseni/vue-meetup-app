import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageNotFound from '@/pages/PageNotFound';
import PageRegister from '@/pages/PageRegister';
import PageSecret from '@/pages/PageSecret';
import PageLogin from '@/pages/PageLogin';
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'PageHome',
            component: PageHome
        },
        {
            path: '/find',
            name: 'PageMeetupFind',
            component: PageMeetupFind
        },
        {
            path: '/meetups/secret',
            name: 'PageSecret',
            component: PageSecret,
            meta: {onlyAuthUser: true}
        },
        {
            path: '/meetups/:id',
            name: 'PageMeetupDetail',
            component: PageMeetupDetail
        },
        {
            path: '/register',
            name: 'PageRegister',
            component: PageRegister
        },
        {
            path: '/login',
            name: 'PageLogin',
            component: PageLogin
        },
        {
            path: '/401',
            name: 'PageNotAuthenticated',
            component: PageNotAuthenticated
        },
        {
            path: '*', // if routes above dont match, route here
            name: 'PageNotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    store.dispatch('auth/getAuthUser')
        .then(()=> {
            if (to.meta.onlyAuthUser) {
                if (store.getters['auth/isAuthenticated']) {
                    next()
                } else {
                    next({ name: 'PageNotAuthenticated' })
                }
            } else {
                next()
            }
        })
})





export default router
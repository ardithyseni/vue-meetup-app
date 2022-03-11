import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
    // in state we keep our data, sharing with the components
    state: {
        // krejt cka i perdorim ne kete app
        meetups: [],
        categories: [],
        threads: [],
        meetup: {}
    },

    // like computed, it can return, filter, count, do functions
    getters: {
        // meetups (state) {
        //     return state.meetups
        // },
        // categories (state) {
        //     return state.categories
        // }
    },
    
    // actions commit mutations.
    // Actions can contain arbitrary asynchronous operations.
    // good spot to fetch data. Action call usually should resolve into data. 
    actions: {
        fetchMeetups ({state, commit}) {
            axios.get('/api/v1/meetups')
                .then(res => {
                const meetups = res.data
                commit('setMeetups', meetups)
                return state.meetups
            })

        },

        fetchCategories ({state, commit}) {
            axios.get('/api/v1/categories')
                .then(res => {
                const categories = res.data
                commit('setCategories', categories)
                return state.categories
            })
        },

        fetchMeetupById ({state, commit}, meetupId) {
            axios.get(`/api/v1/meetups/${meetupId}`).then(res => {
               const meetup = res.data;
               commit('setMeetup', meetup)
               return state.meetup
            });
        },

        fetchThreads ({state, commit}, meetupId) {
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
                .then(res => {
                const threads = res.data
                commit('setThreads', threads)
                return state.threads
            })
        }   
    },

    // The only way to actually change 
    // state in a Vuex store is by committing a mutation.
    mutations: {
        setMeetups (state, meetups) {
            state.meetups = meetups
        },

        setMeetup (state, meetup) {
            state.meetup = meetup
        },
        
        setCategories (state, categories) {
            state.categories = categories
        },
        setThreads (state, threads) {
            state.threads = threads
        }
    }
  })
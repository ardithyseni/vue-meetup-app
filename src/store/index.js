import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



import meetups from './modules/meetups'
import threads from './modules/threads'
import categories from './modules/categories'
import auth from './modules/auth'
import stats from './modules/stats'

export default new Vuex.Store({

    modules: {
        meetups,
        threads,
        categories,
        auth,
        stats
    },

    // in state we keep our data, sharing with the components
    

    // like computed, getters can return, filter, count, do functions
    
    
    // actions commit mutations.
    // Actions can contain arbitrary asynchronous operations.
    // good spot to fetch data. Action call usually should resolve into data. 
    
    

    // The only way to actually change 
    // state in a Vuex store is by committing a mutation.
    mutations: {

        setItems (state, {resource, items}) {
            state[resource].items = items
        },

        setItem (state, {resource, item}) {
            state[resource].item = item
        },

        addItemToArray (state, {item, index, resource}) {
            Vue.set(state[resource].items, index, item)
        }

    }
  })
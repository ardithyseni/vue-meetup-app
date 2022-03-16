import axios from 'axios'

export default {
  namespaced: true,

  state: {
    item: {
      city: '',
      country: ''
    }
  },
  getters: {
    location (state) {
      const {city, country} = state.item
      return (city && country) ? (city + ', ' + country) : ''
    }
  },
  actions: {
    fetchMetaData ({commit, state}) {
      return axios.get('/api/v1')
        .then(res => {
          const meta = res.data
          commit('setItem', {item: meta, resource: 'meta'}, {root: true})
          return meta
        })
    }
  }
}
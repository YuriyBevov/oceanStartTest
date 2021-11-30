let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
let token = "43b7e62f8b5e35438a657ce267979f961dcb9670";

let options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },

    body: null
}

const state = {
    searchResults: [],
    loadingState: false,
}

const getters = {
    searchResults:  state => {
        return state.searchResults.suggestions
    },

    loadingState: state => state.loadingState
}

const actions = {
    SEARCH_USER({ commit }, str) {
        commit('CHANGE_LOADING_STATE', true)
        options.body = JSON.stringify({ query: str })

        fetch(url, options)
        .then(response => response.text())

        .then(result => {
            commit('SET_RESULTS_ARRAY', JSON.parse(result))
        })
        .catch(error => console.log("error", error))
        .finally(() => {
            setTimeout(() => {
                commit('CHANGE_LOADING_STATE', false)
            }, 300);
        }) 
    }
}

const mutations = {
    SET_RESULTS_ARRAY(state, results) {
        state.searchResults = results
    },

    CHANGE_LOADING_STATE(state, bool) {
        state.loadingState = bool
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
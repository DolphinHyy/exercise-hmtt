import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage";

const TOKEN_USER = "tt_token";
Vue.use(Vuex);
const state = {
  user: getItem(TOKEN_USER) || {},
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
    setItem(TOKEN_USER, state.user);
  },
};
const store = new Vuex.Store({
  state,
  mutations,
});

export default store;

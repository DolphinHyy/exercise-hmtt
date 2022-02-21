import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage";

Vue.use(Vuex);
const state = {
  user: getItem("tt_token") || {},
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
    setItem("tt_token", state.user);
  },
};
const store = new Vuex.Store({
  state,
  mutations,
});

export default store;

import axios from "axios";
import Config from "@/config.json";
let state = {
  users: [],
  user:{},
  loader: false,
  user_by_category: [],
};
let mutations = {
  USER_DATA(state, users) {
    state.users = users;
  },
  DATA_SEARCH(state, users) {
    state.user_by_category = users;
  },
  Loader(state, payload) {
    state.loader = payload;
  
  },
  // eslint-disable-next-line no-unused-vars
  SHOW(state, user) {
    state.user = user;
  },
  // eslint-disable-next-line no-unused-vars
  CREATED(state) {},
  // eslint-disable-next-line no-unused-vars
  UPDATE(state) {},
};
let actions = {
  Data({ commit }) {
    return new Promise((resolve, reject) => {
      commit("Loader", true);
      axios
        .get(Config.BASE_URL + "/api/users")
        .then((result) => {
          commit("Loader", false);
          resolve(result);
          commit("USER_DATA", result.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(Config.BASE_URL + "/api/users", data)
        .then((result) => {
          resolve(result);
          commit("CREATED");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },


  Show({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("Loader", true);
      axios
        .get(Config.BASE_URL + "/api/users/" + id)
        .then((result) => {
          resolve(result);
          commit("Loader", false);
          result.data.data['name'] = result.data.data['first_name'] + ' ' + result.data.data['last_name'];
          commit("SHOW", result.data.data);
        })
        .catch((error) => {
          commit("Loader", false);
          reject(error);
        });
    });
  },
  Delete({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(Config.BASE_URL + "/api/users/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  Update({ commit }, data) {
   
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.BASE_URL}/api/users/${data.id}`, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          resolve(result);
          commit("UPDATE");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
let getters = {
  posts(state) {
    return state.posts;
  },
  categories(state) {
    return state.categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

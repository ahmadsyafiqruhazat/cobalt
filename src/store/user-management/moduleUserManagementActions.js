/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "../../http/axios/index.js";
export default {
  // addItem({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     axios.post("/api/data-list/products/", {item: item})
  //       .then((response) => {
  //         commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/profile")
        .then(response => {
          commit("SET_USERS", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchUser(context, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/profile/${userId}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeRecord({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/profile/${userId}`)
        .then(response => {
          commit("REMOVE_RECORD", userId);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateUser({rootState}, payload) {
    let data = { ...payload };
    data.languages_known = payload.languages_known.map(l => l.label ? l.label : l).join(",");
    return new Promise((resolve, reject) => {
      axios
        .put(`/profile/${rootState.AppActiveUser.uid}`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

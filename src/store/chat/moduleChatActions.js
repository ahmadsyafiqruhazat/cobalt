/*=========================================================================================
  File Name: moduleChatActions.js
  Description: Chat Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import { db } from "../../firebase/firebaseConfig";
import axios from "../../http/axios/index.js";

export default {
  setChatSearchQuery({ commit }, query) {
    commit("SET_CHAT_SEARCH_QUERY", query);
  },
  updateAboutChat({ commit, rootState }, value) {
    commit("UPDATE_ABOUT_CHAT", {
      rootState,
      value,
    });
  },
  updateStatusChat({ commit, rootState }, value) {
    commit("UPDATE_STATUS_CHAT", {
      rootState,
      value,
    });
  },

  // API CALLS
  async sendChatMessage({ rootState, commit }, payload) {
    commit("ADD_MESSAGE", payload);
    await db
      .collection("channels")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("chat")
      .doc(payload.id + "")
      .set({ isPinned: payload.isPinned }, { merge: true });
    await db
      .collection("channels")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("chat")
      .doc(payload.id + "")
      .collection("messages")
      .doc()
      .set(payload.msg[0]);
    let other = { ...payload.msg[0] };
    other.isSent = false;
    await db
      .collection("channels")
      .doc(payload.id + "")
      .collection("chat")
      .doc(rootState.AppActiveUser.uid + "")
      .set({ isPinned: payload.isPinned }, { merge: true });
    await db
      .collection("channels")
      .doc(payload.id + "")
      .collection("chat")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("messages")
      .doc()
      .set(other);
  },

  // Get contacts from server. Also change in store
  async fetchContacts({ commit }) {
    const result = await axios.get("/profile");
    result.data.forEach(contact => {
      contact.uid = contact.email;
      contact.status = "online";
      contact.photoURL = contact.photoURL ? contact.photoURL : require("@/assets/images/portrait/small/avatar-s-1.jpg");
    })
    commit("UPDATE_CONTACTS", result.data);
  },

  // Get chat-contacts from server. Also change in store
  async fetchChatContacts({ commit }) {
    const result = await axios.get("/profile");
    result.data.forEach(contact => {
      contact.uid = contact.email;
      contact.status = "online";
      contact.photoURL = contact.photoURL ? contact.photoURL : require("@/assets/images/portrait/small/avatar-s-1.jpg");
    })
    commit("UPDATE_CHAT_CONTACTS", result.data);
  },

  // Get chats from server. Also change in store
  async fetchChats({ commit, rootState }) {
    const result = {};
    const chats = await db
      .collection("channels")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("chat")
      .get();

    for (let doc of chats.docs) {
      const r = await db
        .collection("channels")
        .doc(rootState.AppActiveUser.uid + "")
        .collection("chat")
        .doc(doc.id + "")
        .collection("messages")
        .orderBy("time", "asc")
        .get();

      result[doc.id] = {
        msg: r.docs.map((doc) => doc.data()),
        ...doc.data(),
      };
    }
    commit("UPDATE_CHATS", result);
  },

  async markSeenAllMessages({ getters, commit, rootState }, id) {
    const results = await db
      .collection("channels")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("chat")
      .doc(id + "")
      .collection("messages")
      .get();
    results.docs.forEach((doc) => doc.ref.update({ isSeen: true }));
    commit("MARK_SEEN_ALL_MESSAGES", {
      id,
      chatData: getters.chatDataOfUser(id),
    });
  },

  async toggleIsPinned({ commit, rootState }, payload) {
    const docRef = await db
      .collection("channels")
      .doc(rootState.AppActiveUser.uid + "")
      .collection("chat")
      .doc(payload.id + "")
      .get();

    docRef.ref.update({ isPinned: payload.value });
    commit("TOGGLE_IS_PINNED", payload);
  },
};

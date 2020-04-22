<template>
  <div class="profile">
    <div class="profile-details">
      <img :src="image" class="profile-image" />
      <h1>
        {{ user_data.displayName }}
      </h1>
      <p>{{ user_data.about }}</p>
      <p>{{ user_data.phoneNumber }} </p>
      <li
        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
      >
        <feather-icon icon="MessageSquareIcon" svg-classes="w-4 h-4" />
        <span class="ml-2">Chat</span>
      </li>
      <li
        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
      >
        <!-- TODO: Change hardcoded profile link to hook up to backend -->
        <router-link to="/profile/schedule">
          <feather-icon icon="UserIcon" svg-classes="w-4 h-4" />
          <span class="ml-2">View Schedule</span>
        </router-link>
      </li>
    </div>
    <!-- <div class="past-experience-container">
      <div
        v-for="item in experiences"
        :key="item.id"
        class="past-experience-item"
      >
        <h1>{{ item.title }}</h1>
        <img :src="item.image" class="experience-image" />
        <p>{{ item.description }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";

export default {
  name: "ProfileView",
  components: {},
  props: {},
  data: function() {
    return {
      user_data: null,
      image: "/static/img/profile_pic.png",
      name: "John Doe",
      contact: "+65 9234 5678",
      email: "sample@email-me.com",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      experiences: [
        { id: 0, title: "Experience 1", description: "ipsum", image: "" },
        { id: 1, title: "Experience 2", description: "ipsum", image: "" },
        { id: 2, title: "Experience 3", description: "ipsum", image: "" }
      ]
    };
  },
  computed: {},
  methods: {
    showSidebar() {
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
    }
  },
  created() {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule("userManagement", moduleUserManagement);
      moduleUserManagement.isRegistered = true;
    }

    const userId = this.$store.state.AppActiveUser.uid
    this.$store
      .dispatch("userManagement/fetchUser", userId)
      .then(res => {
        res.data.languages_known = res.data.languages_known ? res.data.languages_known.split(",") : [];
        this.user_data = res.data;
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true;
          return;
        }
        // console.error(err);
      });
  },
};
</script>

<style scoped>
h1 {
  margin: 5px;
}

li {
  margin: 5px;
}
p {
  margin: 5px;
}

.profile-image {
  border-radius: 50%;
  background-color: #404040;
  height: 150px;
  width: 150px;
  margin: 5px;
}

.experience-image {
  background-color: #404040;
  height: 100px;
  width: 90%;
  margin: auto;
}
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-details {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60vw;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.past-experience-container {
  display: flex;
  flex-direction: row;
}

.past-experience-item {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px #404040 solid;
  border-radius: 5px;
}
</style>

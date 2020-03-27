<template>
  <div
    v-if="activeUserInfo.displayName"
    class="the-navbar__user-meta flex items-center"
  >
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="activeUserInfo.photoURL"
          key="onlineImg"
          :src="activeUserInfo.photoURL"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <!-- TODO: Change hardcoded profile link to hook up to backend -->
            <router-link to="/profile">
              <feather-icon icon="UserIcon" svg-classes="w-4 h-4" />
              <span class="ml-2">Profile</span>
            </router-link>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="MailIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="CheckSquareIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <router-link to="/chat">
              <feather-icon icon="MessageSquareIcon" svg-classes="w-4 h-4" />
            </router-link>
            <span class="ml-2">Chat</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="HeartIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  methods: {
    logout() {
      // if user is logged in via firebase
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

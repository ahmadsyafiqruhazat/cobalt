<template>
  <div>
    <h1>Tutors Directory</h1>
    <div class="tutors-container">
      <div v-for="item in tutors" :key="item.id" class="tutor-item">
        <h1>{{ item.title }}</h1>
        <img :src="item.image" class="tutor-image" />
        <p>{{ item.description }}</p>
        <router-link :to="item.route">View Profile</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Directory",
  components: {},
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data: function() {
    return {
      image: "/static/img/profile_pic.png",
      name: "John Doe",
      contact: "+65 9234 5678",
      email: "sample@email-me.com",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      tutors: [
        {
          id: 0,
          title: "Name 1",
          description: "ipsum",
          image: "",
          route: "/profile-id-123"
        },
        {
          id: 1,
          title: "Name 2",
          description: "ipsum",
          image: "",
          route: "/profile-id-234"
        },
        {
          id: 2,
          title: "Name 3",
          description: "ipsum",
          image: "",
          route: "/profile-id-345"
        }
      ]
    };
  },
  computed: {},
  methods: {
    showSidebar() {
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
    }
  }
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

.tutor-image {
  background-color: #404040;
  height: 100px;
  width: 90%;
  border-radius: 50%;
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

.tutors-container {
  display: flex;
  flex-direction: row;
}

.tutor-item {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px #404040 solid;
  border-radius: 5px;
}
</style>

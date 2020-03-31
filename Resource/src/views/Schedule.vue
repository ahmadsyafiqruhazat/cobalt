<template>
  <div>
    <Calendar></Calendar>
    <div class="calendar-items-container"></div>
    <li
      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white button"
    >
      <router-link to="/profile">
        <feather-icon icon="UserIcon" svg-classes="w-4 h-4" />
        <span class="ml-2">Back to Profile</span>
      </router-link>
    </li>
  </div>
</template>

<script>
import Calendar from "../components/calendar/SimpleCalendar.vue";

export default {
  name: "Schedule",
  components: { Calendar },
  props: {},
  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.calendar-items-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.button {
  width: 175px;
  justify-content: center;
  align-items: center;
}
</style>

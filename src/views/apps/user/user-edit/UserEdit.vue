<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">
    <!-- <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert> -->

    <div v-if="user_data" id="user-data">
      <vx-card title="Account Information" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div id="avatar-col" class="vx-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
              <input
                ref="update_avatar_input"
                type="file"
                class="hidden"
                accept="image/*"
                @change="update_avatar"
              />
              <vs-button
                type="border"
                class="mr-4"
                @click="$refs.update_avatar_input.click()"
                >Change Avatar
              </vs-button>
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div id="account-info-col-1" class="vx-col flex-1">
            <table>
              <tr>
                <td class="font-semibold">Username</td>
                <td>{{ user_data.username }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Tutor's Name</td>
                <vs-input
                  v-model="user_data.name"
                  v-validate="'required|alpha_num'"
                  name="name"
                />
                <span v-show="errors.has('name')" class="text-danger text-sm">{{
                  errors.first("name")
                }}</span>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>

                <div class="mt-2">
                  <vs-radio
                    v-model="user_data.gender"
                    vs-value="male"
                    class="mr-4"
                    >Male</vs-radio
                  >
                  <vs-radio
                    v-model="user_data.gender"
                    vs-value="female"
                    class="mr-4"
                    >Female</vs-radio
                  >
                  <vs-radio v-model="user_data.gender" vs-value="other"
                    >Other</vs-radio
                  >
                </div>
              </tr>

              <tr>
                <td class="font-semibold">Birth Date</td>

                <flat-pickr
                  v-model="user_data.dob"
                  v-validate="'required'"
                  :config="{ dateFormat: 'd F Y', maxDate: new Date() }"
                  class="w-full"
                  name="dob"
                />
                <span v-show="errors.has('dob')" class="text-danger text-sm">{{
                  errors.first("dob")
                }}</span>
              </tr>

              <tr>
                <td class="font-semibold">Languages</td>
                <v-select
                  v-model="user_data.languages_known"
                  v-validate="'required'"
                  multiple
                  :close-on-select="false"
                  :options="langOptions"
                  name="lang_known"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <span
                  v-show="errors.has('lang_known')"
                  class="text-danger text-sm"
                  >{{ errors.first("lang_known") }}</span
                >
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div id="account-info-col-2" class="vx-col flex-1">
            <table>
              <td class="font-bold">Contact</td>
              <tr>
                <td class="font-semibold">Email</td>
                <vs-input
                  v-model="user_data.email"
                  v-validate="'required|email'"
                  class="w-full mt-4"
                  type="email"
                  name="email"
                />
                <span
                  v-show="errors.has('email')"
                  class="text-danger text-sm"
                  >{{ errors.first("email") }}</span
                >
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <vs-input
                  v-model="user_data.mobile"
                  v-validate="{ regex: '^\\+?([0-9]+)$' }"
                  class="w-full mt-4"
                  name="mobile"
                />
                <span
                  v-show="errors.has('mobile')"
                  class="text-danger text-sm"
                  >{{ errors.first("mobile") }}</span
                >
              </tr>
            </table>
          </div>

          <div id="account-info-col-2" class="vx-col flex-1"></div>
          <!-- /Information - Col 2 -->
        </div>
      </vx-card>

      <vx-card title="About Myself" class="mb-base">
        <vs-textarea v-model="user_data.about" name="about" />
        <span v-show="errors.has('about')" class="text-danger text-sm">{{
          errors.first("about")
        }}</span>
      </vx-card>

      <vx-card title="My Lessons" class="mb-base">
        <table>
          <v-select
            v-model="user_data.subjectlist"
            v-validate="'required'"
            multiple
            :close-on-select="false"
            :options="subjectOptions"
            name="subjectlist"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span
            v-show="errors.has('subjectlist')"
            class="text-danger text-sm"
            >{{ errors.first("subjectlist") }}</span
          >
        </table>
      </vx-card>

      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button
            class="ml-auto mt-2"
            :disabled="!validateForm"
            @click="save_changes"
            >Save Changes</vs-button
          >
          <vs-button
            class="ml-4 mt-2"
            type="border"
            color="warning"
            @click="reset_data"
            >Reset</vs-button
          >
        </div>
      </div>
    </div>

    <!-- <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Social Links" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Twitter</td>
                <td>{{ user_data.social_links.twitter }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Facebook</td>
                <td>{{ user_data.social_links.facebook }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Instagram</td>
                <td>{{ user_data.social_links.instagram }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Github</td>
                <td>{{ user_data.social_links.github }}</td>
              </tr>
              <tr>
                <td class="font-semibold">CodePen</td>
                <td>{{ user_data.social_links.codepen }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Slack</td>
                <td>{{ user_data.social_links.slack }}</td>
              </tr>
            </table>
          </vx-card>
        </div> -->
  </div>
</template>

<script>
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
    flatPickr
  },
  data() {
    return {
      user_data: null,
      user_not_found: false,
      langOptions: [
        { label: "English", value: "english" },
        { label: "Malay", value: "french" },
        { label: "Mandarin", value: "mandarin" },
        { label: "Tamil", value: "tamil" }
      ],
      subjectOptions: [
        { label: "English", value: "english" },
        { label: "Math", value: " math" },
        { label: "Science", value: "science" }
      ]
      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      // data_local: JSON.parse(JSON.stringify(this.user_data)),
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any();
    }
  },
  watch: {
    activeTab() {
      this.fetch_user_data(this.$route.params.userId);
    }
  },

  created() {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule("userManagement", moduleUserManagement);
      moduleUserManagement.isRegistered = true;
    }
    const userId = this.$route.params.userId;
    this.$store
      .dispatch("userManagement/fetchUser", userId)
      .then(res => {
        this.user_data = res.data;
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true;
          return;
        }
        // console.error(err)
      });
  },
  methods: {
    save_changes() {
      /* eslint-disable */
      if (!this.validateForm) return;

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data() {
      this.data_local = Object.assign({}, this.data);
    }
  },
  methods: {}
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>

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
    <vs-alert
      color="danger"
      title="User Not Found"
      :active.sync="user_not_found"
    >
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'page-user-list' }"
          class="text-inherit underline"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div v-if="user_data" id="user-data">
      <vx-card title="Account Information" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div id="avatar-col" class="vx-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div id="account-info-col-1" class="vx-col flex-1">
            <table>
              <tr>
                <td class="font-semibold">Tutor's Name</td>
                <td>{{ user_data.displayName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>
                <td>{{ user_data.gender }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Birth Date</td>
                <td>{{ user_data.dob }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Languages</td>
                <td>{{ languages }}</td>
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
                <td>{{ user_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>{{ user_data.phoneNumber }}</td>
              </tr>
            </table>
          </div>

          <div id="account-info-col-2" class="vx-col flex-1"></div>
          <!-- /Information - Col 2 -->
        </div>
      </vx-card>

      <vx-card title="About Myself" class="mb-base">
        <tr>
          <td>{{ user_data.about }}</td>
        </tr>
      </vx-card>

      <vx-card title="My Lessons" class="mb-base">
        <table>
          <tr>
            <td v-for="subject in user_data.lessons" :key="subject">
              {{ subject }}
            </td>
          </tr>
        </table>
      </vx-card>

      <div id="account-manage-buttons" class="vx-col lg:w-1/2 flex">
        <vs-button
          icon-pack="feather"
          icon="icon-edit"
          class="mr-4"
          :to="{
            name: 'app-user-edit',
            params: { userId: $route.params.userId }
          }"
          >Edit</vs-button
        >
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

    <!-- Permissions -->
    <!-- <vx-card>

        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
              <span class="font-medium text-lg leading-none">Permissions</span>
            </div>
            <vs-divider />
          </div>
        </div>

        <div class="block overflow-x-auto">
          <table class="w-full permissions-table">
            <tr> -->
    <!--
                You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
                our data structure. You just have to loop over above variable to get table headers.
                Below we made it simple. So, everyone can understand.
               -->
    <!-- <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']" :key="heading">{{ heading }}</th>
            </tr>

            <tr v-for="(val, name) in user_data.permissions" :key="name">
              <td class="px-3 py-2">{{ name }}</td>
              <td v-for="(permission, name) in val" class="px-3 py-2" :key="name+permission">
                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
              </td>
            </tr>
          </table>
        </div>

      </vx-card> -->
  </div>
</template>

<script>
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";

export default {
  data() {
    return {
      user_data: null,
      user_not_found: false
    };
  },
  computed: {
    languages() {
      return this.user_data.languages_known? this.user_data.languages_known.join(", ") : "English";
    },
    userAddress() {
      let str = "";
      for (const field in this.user_data.location) {
        str += `${field} `;
      }
      return str;
    },
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
  methods: {
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: "Delete"
      });
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      this.$router.push({ name: "app-user-list" });
      this.showDeleteSuccess();

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: "success",
        title: "User Deleted",
        text: "The selected user was successfully deleted"
      });
    }
  }
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

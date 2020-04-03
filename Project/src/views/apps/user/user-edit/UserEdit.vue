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

    <div id="user-data" v-if="user_data">

      <vx-card title="Account Information" class="mb-base">


        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
              <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">
              <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar            </vs-button>
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Username</td>
                <td>{{ user_data.username }}</td>


              </tr>
              <tr>
                <td class="font-semibold">Tutor's Name</td>
                <vs-input v-model="user_data.name" v-validate="'required|alpha_num'" name="name" />
                <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>

                <div class="mt-2">
                  <vs-radio v-model="user_data.gender" vs-value="male" class="mr-4">Male</vs-radio>
                  <vs-radio v-model="user_data.gender" vs-value="female" class="mr-4">Female</vs-radio>
                  <vs-radio v-model="user_data.gender" vs-value="other">Other</vs-radio>
                </div>

              </tr>

              <tr>
                <td class="font-semibold">Birth Date</td>

                <flat-pickr v-model="user_data.dob" :config="{ dateFormat: 'd F Y', maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
                <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>


              </tr>

              <tr>
                <td class="font-semibold">Languages</td>
                <v-select v-model="user_data.languages_known" multiple :closeOnSelect="false" :options="langOptions" v-validate="'required'" name="lang_known" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                <span class="text-danger text-sm"  v-show="errors.has('lang_known')">{{ errors.first('lang_known') }}</span>


              </tr>

            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <td class="font-bold">Contact</td>
              <tr>
                <td class="font-semibold">Email</td>
                <vs-input class="w-full mt-4" v-model="user_data.email" type="email" v-validate="'required|email'" name="email" />
                <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>


              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <vs-input class="w-full mt-4" v-model="user_data.mobile" v-validate="{regex: '^\\+?([0-9]+)$' }" name="mobile" />
                <span class="text-danger text-sm"  v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>

              </tr>

            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">

          </div>
          <!-- /Information - Col 2 -->


        </div>

      </vx-card>

      <vx-card title="About Myself" class="mb-base">
                <vs-textarea v-model="user_data.about" name="about" />
                <span class="text-danger text-sm"  v-show="errors.has('about')">{{ errors.first('about') }}</span>

      </vx-card>

      <vx-card title="My Lessons" class="mb-base">
            <table>
                <v-select v-model="user_data.subjectlist" multiple :closeOnSelect="false" :options="subjectOptions" v-validate="'required'" name="subjectlist" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                <span class="text-danger text-sm"  v-show="errors.has('subjectlist')">{{ errors.first('subjectlist') }}</span>
            </table>
      </vx-card>


    <div class="vx-row">
      <div class="vx-col w-full">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
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
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    flatPickr
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,
      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Malay',   value: 'french'   },
        { label: 'Mandarin',  value: 'mandarin'  },
        { label: 'Tamil',  value: 'tamil'  }
      ],
      subjectOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Math',   value: ' math'   },
        { label: 'Science',  value: 'science'  }
      ]
      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      // data_local: JSON.parse(JSON.stringify(this.user_data)),
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  watch: {
    activeTab () {
      this.fetch_user_data(this.$route.params.userId)
    }
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data () {
      this.data_local = Object.assign({}, this.data)
    }
  },
  methods: {
  },

  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    const userId = this.$route.params.userId
    this.$store.dispatch('userManagement/fetchUser', userId)
      .then(res => { this.user_data = res.data })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        console.error(err)
      })
  }
}

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
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
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


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
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

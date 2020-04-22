<template>
  <div class="items-grid-view vx-row match-height">
    <div
      v-for="tutor in user_data"
      :key="tutor.id"
      class="vx-col lg:w-1/3 sm:w-1/2 w-full"
    >
      <item-grid-view :item="tutor">
        <!-- SLOT: ACTION BUTTONS -->
        <template slot="action-buttons">
          <div class="flex flex-wrap"></div>
        </template>
      </item-grid-view>
    </div>
  </div>
</template>

<script>
import ItemGridView from "./components/ItemGridView.vue";
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";

export default {
  components: {
    ItemGridView
  },
  data() {
    return {
      user_data: null,
      items: [
        {
          name:
            "Nikon - D810 DSLR Camera with AF-S NIKKOR 24-120mm f/4G ED VR Zoom Lens - Black",
          description:
            "Shoot arresting photos and 1080p high-definition videos with this Nikon D810 DSLR camera, which features a 36.3-megapixel CMOS sensor and a powerful EXPEED 4 processor for clear, detailed images. The AF-S NIKKOR 24-120mm lens offers shooting versatility. Memory card sold separately.",
          brand: "Nikon",
          categories: [
            "Cameras & Camcorders",
            "Digital Cameras",
            "Digital SLR Cameras",
            "DSLR Body & Lens"
          ],
          hierarchicalCategories: {
            lvl0: "Cameras & Camcorders",
            lvl1: "Cameras & Camcorders > Digital Cameras",
            lvl2:
              "Cameras & Camcorders > Digital Cameras > Digital SLR Cameras",
            lvl3:
              "Cameras & Camcorders > Digital Cameras > Digital SLR Cameras > DSLR Body & Lens"
          },
          type: "Dslr cameras",
          price: 4099.99,
          price_range: "> 2000",
          image: "https://cdn-demo.algolia.com/bestbuy-0118/3953409_sb.jpg",
          url: "https://api.bestbuy.com/click/-/3953409/pdp",
          free_shipping: true,
          rating: 4,
          popularity: 12311,
          objectID: "3953409",
          _highlightResult: {
            name: {
              value:
                "Nikon - D810 DSLR Camera with AF-S NIKKOR 24-120mm f/4G ED VR Zoom Lens - Black",
              matchLevel: "none",
              matchedWords: []
            },
            description: {
              value:
                "Shoot arresting photos and 1080p high-definition videos with this Nikon D810 DSLR camera, which features a 36.3-megapixel CMOS sensor and a powerful EXPEED 4 processor for clear, detailed images. The AF-S NIKKOR 24-120mm lens offers shooting versatility. Memory card sold separately.",
              matchLevel: "none",
              matchedWords: []
            },
            brand: { value: "Nikon", matchLevel: "none", matchedWords: [] },
            categories: [
              {
                value: "Cameras &amp; Camcorders",
                matchLevel: "none",
                matchedWords: []
              },
              {
                value: "Digital Cameras",
                matchLevel: "none",
                matchedWords: []
              },
              {
                value: "Digital SLR Cameras",
                matchLevel: "none",
                matchedWords: []
              },
              {
                value: "DSLR Body &amp; Lens",
                matchLevel: "none",
                matchedWords: []
              }
            ]
          },
          quantity: 1,
          discount_in_percentage: 13,
          offers_count: 4,
          delivery_date: "Wed Apr 10"
        },
      ]
    };
  },
  computed: {
    usersData() {
      return this.$store.state.userManagement.users;
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
  }
};
</script>

<style lang="scss">
#algolia-instant-search-demo {
  .algolia-header {
    .algolia-filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #algolia-content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .algolia-search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .algolia-price-slider {
    min-width: unset;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #algolia-instant-search-demo {
    #algolia-content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #algolia-content-container {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
}
</style>

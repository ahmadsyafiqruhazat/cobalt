/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon"
  },
  // {
  //   url: "/directory",
  //   name: "Directory",
  //   slug: "directory",
  //   icon: "DirectoryIcon"
  //   // TODO: update icon
  // },
  {
    url: null,
    name: "User",
    icon: "UserIcon",
    i18n: "User",
    submenu: [
      // {
      //   url: "/pages/Profile",
      //   name: "Profile",
      //   slug: "app-user-profile",
      //   i18n: "Profile"
      // },
      {
        url: "/apps/user/user-edit",
        name: "Edit Profile",
        slug: "app-user-edit",
        i18n: "Edit Profile"
      },
      // {
      //   url: "/apps/user/user-list",
      //   name: "List",
      //   slug: "app-user-list",
      //   i18n: "List"
      // },
      {
        url: "/apps/user/user-view",
        name: "View",
        slug: "app-user-view",
        i18n: "View"
      }
    ]
  },
  {
    url: "/apps/tutor-directory/",
    name: "Tutors Directory",
    slug: "tutors-directory"
  }
  // {
  //   url: null,
  //   name: "Dashboard",
  //   tag: "2",
  //   tagColor: "warning",
  //   icon: "HomeIcon",
  //   i18n: "Dashboard",
  //   submenu: [
  //     {
  //       url: "/dashboard/analytics",
  //       name: "Analytics",
  //       slug: "dashboard-analytics",
  //       i18n: "Analytics"
  //     },
  //     {
  //       url: "/dashboard/ecommerce",
  //       name: "eCommerce",
  //       slug: "dashboard-ecommerce",
  //       i18n: "eCommerce"
  //     }
  //   ]
  // }
];

import Home from "@/components/home";

export default [
  {
    path: "/display",
    name: "display",
    meta: {
      title: "display - 展示",
      hideInMenu: true
    },
    component: () => import("@/views/display.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login - 登录",
      hideInMenu: true
    },
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Home,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: "首页",
          notCache: true,
          icon: "md-home"
        },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/views/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/views/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/views/error-page/404.vue")
  }
];

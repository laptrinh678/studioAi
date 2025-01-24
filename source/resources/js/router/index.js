import { createRouter, createWebHistory } from 'vue-router'
import store from "~/store"
import { getToken, getUserInfo } from "~/helpers/localStorage"
import i18n from "~/lang/i18n"
import {
  ACTION_CLEAR_SEARCH_PARAMS,
  ACTION_SET_ACTIVE_SIDEBAR,
  ACTION_SET_PAGE_TITLE
} from "~/store/common/actions"
import {ACTION_AUTHORIZE_SSO} from "~/store/auth/actions"
import listRoutes from './routes'
import clientRoutes from './clientRoutes'
import AuthService from "../services/AuthService"

const NotFound = () => import("~/pages/errors/404.vue").then(m => m.default || m);
const Unauthorized = () => import("~/pages/errors/403.vue").then(m => m.default || m);

// const Login = () => import("~/pages/auth/Login.vue").then(m => m.default || m);

const LayoutAdmin = () => import("~/components/layouts/LayoutApp").then(m => m.default || m);

const LayoutClient = () => import("~/components/layouts/LayoutClient").then(m => m.default || m);

const UserManagement = () => import("../pages/user/Index.vue")
const ServiceUnavailable = () => import("../pages/errors/503.vue")
// import checkPermission from '~/middleware/check_permission'

const routes = [
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      meta: {
        requireAuth: false,
        // middleware: [checkPermission],
      },
      component: NotFound,
    },
    {
      path: "/forbidden",
      name: "Forbidden",
      meta: {
        requireAuth: false,
      },
      component: Unauthorized,
    },
    {
        path: "/service_unavailable",
        name: "ServiceUnavailable",
        meta: {
            requireAuth: false
        },
        component: ServiceUnavailable
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     meta: {
    //         title: 'Đăng nhập'
    //     },
    //     component: Login,
    // },
    {
        path: "/admin",
        component: LayoutAdmin,
        children: [
            ...listRoutes
        ],
    },
    {
      path: "",
      component: LayoutClient,
      children: [
          ...clientRoutes
      ],
  },
    {
        path: "/user_management",
        name: "User Management",
        meta: {
            title: "User Management",
            requiresAuth: false,
        },
        component: UserManagement,
        beforeEnter: async (to, from) => {
            if (from.name === 'AI Studio') {
                return true
            } else {
                const {data} = await AuthService.getAuthUser()
                if (data && data.role === "admin") {
                    return true
                }
            }

            await router.push({name: 'Forbidden'})
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
      return { top: 0 };
    },
    routes
  });

  router.beforeEach((to, from, next) => {
    store.dispatch(ACTION_SET_ACTIVE_SIDEBAR, to.name)
    store.dispatch(ACTION_SET_PAGE_TITLE, to.meta.title)

    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const isAuthenticated = store.getters.isAuthenticated || !!getToken();

    if (requiresAuth && !isAuthenticated) {
        store.dispatch(ACTION_AUTHORIZE_SSO).then(() => {})
    } else if (to.path === "/login" && isAuthenticated) {
      next({ path: '/' });
    } else if (to.meta.onlyAdmin) {
      const userInfo = JSON.parse(getUserInfo());
      if (userInfo.role === "admin") {
        next()
      } else {
        next({ path: '/' });
      }
    } else {
      next()
    };

    window.popStateDetected = false;
    const isItABackButton = window.popStateDetected;

    if (isItABackButton) {
      store.dispatch(ACTION_CLEAR_SEARCH_PARAMS);
    }

    document.title = i18n.global.t(to.meta.title);
  });

  export default router;
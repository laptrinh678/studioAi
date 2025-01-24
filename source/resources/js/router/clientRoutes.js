const LandingPage = () => import("~/pages/LandingPage.vue");
const AiGenarate = () => import("~/pages/AiGenarate/index.vue")
const Verify = () => import("~/pages/Verify.vue")
const User = () => import("~/pages/User.vue")

export default [
    {
        path: "landing_page",
        component: LandingPage,
        meta: {
            title: "Landing Page",
            requiresAuth: false
        },
        name: 'Landing Page'
    },
    {
        path: "",
        name: "AI Studio",
        meta: {
            title: "AI Studio",
            requiresAuth: true
        },
        component: AiGenarate
    },
    {
        path: "auth/callback",
        name: "Verify",
        meta: {
            title: "Verify",
            requiresAuth: false
        },
        component: Verify
    },
    {
        path: "setting_permission",
        name: "Setting Permission",
        meta: {
            title: "Setting Permission",
            requiresAuth: true,
            onlyAdmin: true
        },
        component: User
    }
]
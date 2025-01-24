const Dashboard = () => import("~/pages/dashboard/Dashboard.vue");
// const TestPage = () => import("~/pages/Test.vue");

export default [
    {
        path: "",
        name: "dashboard",
        meta: {
            title: "meta.dashboard",
            requiresAuth: true
        },
        component: Dashboard
    },
    // {
    //     path: "test",
    //     name: "Test",
    //     meta: {
    //         title: "meta.dashboard",
    //         requiresAuth: false
    //     },
    //     component: TestPage
    // }
]
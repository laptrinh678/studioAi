import store from "~/store"

export default async (to, from, next) => {
    console.log(store.getters["auth/check"]);
    if (!store.getters["auth/check"]) {
        next({ name: "login" });
    } else {
        next();
    }
};

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./model/index";
import store from "@/store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const authenticated = store.state.user.session.authenticated;
  const isPublic = to.matched.some(record => record.meta.public);

  if (!isPublic && !authenticated) {
    next({
      path: "/login"
    });
  }
  next();
});

export default router;

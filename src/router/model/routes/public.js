const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/Login.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/Registro.vue")
  },
  {
    path: "/vacuna",
    name: "vacuna",
    component: () => import("@/components/TabSanitario.vue")
  },
  {
    path: "/gestioneconomica",
    name: "gestioneconomica",
    component: () => import("@/components/GestionEconomica.vue")
  }
];

export default routes.map(route => {
  const meta = {
    public: true,
    onlyLoggedOut: true
  };

  return {
    ...route,
    meta
  };
});

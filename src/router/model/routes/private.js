const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../../../views/Home.vue")
  },
  {
    path: "/maestro",
    name: "maestro",
    component: () => import("../../../views/admin/LayoutMaster.vue"),
    children: [
      {
        path: "usuario",
        component: () => import("@/views/admin/GestionUsuario/Usuarios.vue")
      },
      {
        path: "especie",
        component: () => import("@/views/admin/GestionRequerimientos/Especie")
      },
      {
        path: "insumo",
        component: () => import("../../../views/admin/GestionContenido/Insumo")
      },
      {
        path: "nutriente",
        component: () => import("@/views/admin/GestionNutriente/Nutriente")
      }
    ]
  },
  {
    path: "/asesor",
    name: "asesor",
    component: () => import("../../../views/asesor/LayoutUsuario.vue"),
    children: [
      {
        path: "reunion",
        component: () => import("@/views/asesor/Reunion/Reunion.vue")
      },
      {
        path: "cita",
        component: () => import("@/views/asesor/cita/Cita.vue")
      }
    ]
  },
  {
    path: "/usuarioHome",
    name: "usuarioHome",
    component: () => import("../../../views/usuario/LayoutUsuario.vue"),
    children: [
      {
        path: "inventario",
        component: () =>
          import("../../../views/usuario/Inventario/LayoutInventario.vue")
      },
      {
        path: "granjas",
        component: () => import("@/views/usuario/Granja/LayoutGranja.vue")
      },
      {
        path: "maquina",
        component: () =>
          import(
            "../../../views/usuario/Maquina/LayoutMaquina.vue"
          )
      },
      {
        path: "raciones",
        component: () =>
          import(
            "../../../views/usuario/racionFormulada/LayoutRacionFormulada.vue"
          )
      },
      {
        path: "requerimiento",
        component: () =>
          import(
            "../../../views/usuario/VisualizarRequerimientos/LayoutEspecieVer.vue"
          )
      },
      {
        path: "vacuna",
        component: () => import("../../../views/usuario/Sanitario/SanitarioVacuna.vue")
      },
      {
        path: "antibiotico",
        component: () => import("../../../views/usuario/Sanitario/SanitarioAntibiotico.vue")
      },
      {
        path: "hormona",
        component: () => import("../../../views/usuario/Sanitario/SanitarioHormona.vue")
      },
      {
        path: "reportes",
        component: () => import("../../../views/usuario/Reportes/Reportes.vue")
      },
      {
        path: "videollamada",
        component: () => import("../../../views/usuario/Reunion/Videollamada.vue")
      }
    ]
  }
];

export default routes.map(route => {
  const meta = {
    public: false
  };

  return {
    ...route,
    meta
  };
});

<template>
  <v-app class="fondo">
    <v-main>
      <Navbar :userN="usuario" v-on:estadoDrawer="estadoDrawer" />
      <Sidebar
        :nameSidebarP="nameSidebar"
        :itemsP="items"
        :drawerP="drawer"
        v-on:estadoDrawer="estadoDrawer"
      />
      <v-container class="fondo">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import store from "@/store/store";
export default {
  name: "maestros",
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    usuario() {
      return store.state.user.data;
    }
  },
  data() {
    return {
      nameSidebar: "Maestros",
      drawer: true,
      items: [
        {
          title: "Gestión Usuario",
          link: "/maestro/usuario"
        },
        {
          title: "Gestión Especies",
          link: "/maestro/especie"
        },
        {
          title: "Gestión Insumos",
          link: "/maestro/insumo"
        },
        {
          title: "Gestión Nutriente",
          link: "/maestro/nutriente"
        }
      ]
    };
  },
  methods: {
    estadoDrawer() {
      this.drawer = this.drawer ? false : true;
    }
  }
};
</script>

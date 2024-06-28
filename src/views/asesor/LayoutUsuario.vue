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
  name: "asesor",
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
      nameSidebar: "Inicio",
      drawer: true,
      items: [
        {
          title: "Reunion",
          link: "/asesor/reunion"
        },
        {
          title: "cita",
          link: "/asesor/cita"
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

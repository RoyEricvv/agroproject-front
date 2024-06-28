<template>
  <div>
    <v-app-bar color="#0A332C" flat app>
      <v-icon class="mr-2" @click="$emit('estadoDrawer')">
        mdi-menu
      </v-icon>
      <overline color="#FFFFFF">{{ user.nombres }} {{ user.apellidos }}</overline>
      <v-spacer></v-spacer>
      <v-btn @click.native="logoutAction()" color="#00A884">
        Cerrar Sesión
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  props: {
    userN: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      user: this.userN
    };
  },
  methods: {
    ...mapActions("user", ["logOut"]),
    logoutAction() {
      this.logOut();
      this.$router.push("/login");
    }
  }
};
</script>

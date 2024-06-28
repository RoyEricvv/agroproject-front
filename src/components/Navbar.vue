<template>
  <div>
    <v-app-bar color="green" flat app>
      <v-icon class="mr-2" @click="$emit('estadoDrawer')">
        mdi-menu
      </v-icon>
      <overline>{{ user.nombres }} {{ user.apellidos }}</overline>
      <v-spacer></v-spacer>
      <v-btn @click.native="logoutAction()" color="green">
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

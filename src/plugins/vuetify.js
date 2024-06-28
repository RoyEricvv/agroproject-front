import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

/* Vuetify theme config */
export default new Vuetify({
   theme: {
      themes: {
         light_old: {
            primary: "#1976D2",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107"
         },
         light: {
            primary: "#0A332C", //gris claro bdecb6
            secondary: "#00A884", //verde
            accent: "#363740", //gris oscuro
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
            third: "#FFFFFF",
            fondo: "#F8F8F8"
         }
      }
   }
});

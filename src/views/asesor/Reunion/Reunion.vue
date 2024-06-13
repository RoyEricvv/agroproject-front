<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div>
      <h1 style="color:grey;">Mis reuniones</h1>
      <br />
      <h2 style="color:#4CAF50;">Lista de reuniones</h2>
      <v-card
        class="mx-auto"
        max-width="1500"
        
      >
        <v-card-text>
          <div>Reunión con Maria</div>
          <p class="text-h4 text--primary">
            24 de diciembre del 2023, 12:00
          </p>
        </v-card-text>
        <v-card-actions>
          
          <v-btn
            text
            color="secondary"
            @click="redirigirAPagina"
          >
            CONECTAR REUNIÓN
          </v-btn>
          <v-btn
            text
            color="secondary"
          >
            CANCELAR REUNIÓN
          </v-btn>
          <v-btn
            text
            color="secondary"
          >
            SUBIR ARCHIVO
            <v-icon
              right
              dark
            >
              mdi-cloud-upload
            </v-icon> 
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog
          v-model="dialogVideollamada"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card color="primary">
           
            <v-btn
              icon
              
              @click= "dialogVideollamada = false"
              
            >
¿
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <!-- <h1 style="color:grey;">Videollamada</h1>   -->
            <v-card-text>              
              <div class="embedded-page">
                  <iframe :src="url" width="100%" height="1000px" frameborder="0"></iframe>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      

    </div>
    
  </v-container>
</template>

<script>
// import { getAllAnimalesUsuario } from "@/services/Animales.js";
// import { getReportePeso } from "@/services/Reporte.js";
// import store from "@/store/store";
export default {
  name: "App",
  components: {
    
  },
  data() {
    return {
      dialog: false,
      dialogVideollamada: false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      url: "https://webrtc-demo-simple.web.app/?room=125", 

    };
  },
  methods: {
    redirigirAPagina() {
      // Utiliza la URL específica proporcionada
      window.location.href = 'https://webrtc-demo-simple.web.app/?room=125';
    }
  },

};
</script>

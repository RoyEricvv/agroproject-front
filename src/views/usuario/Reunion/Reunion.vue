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
      <v-row justify="end">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="secondary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Agendar reunión
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5" style="color:#4CAF50;">Agendar reunión</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="text-h5" style="color:#4CAF50;">Elija la fecha de tu reunión</span>
                      </v-card-title>
                      <v-card-text>
                        <v-row justify="center">
                          <v-date-picker v-model="picker" locale="pe"></v-date-picker>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-card>
                        <v-card-text>
                          <v-row justify="center">
                            <v-col
                              cols="12"
                              sm="12"
                            >
                              <v-select
                                :items="['Juan', 'Pedro']"
                                label="Asesor*"
                                required
                              ></v-select>
                            </v-col>
                            
                            <v-col
                              cols="12"
                              sm="12"
                            >
                              <v-autocomplete
                                :items="['12:00', '12:30']"
                                label="Hortario*"
                                type="time"
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Cerrar
              </v-btn>
              <v-btn
                color="secondary"
                @click="dialog = false"
              >
                Agendar reunión
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    
      </v-row>
      <br />
      <br />
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
            DESCARGAR ARCHIVO
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
              
              @click="dialogVideollamada = false"
            >
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

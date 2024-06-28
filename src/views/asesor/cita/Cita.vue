<template>
    <v-container
      class="fondo"
      fluid
      style="lef-margin: 0px; padding: 0px; width: 95%"
    >
      <div>
        <h1 style="color:grey;">Agenda cita</h1>
        <v-row justify="end">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Agendar cita
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5" style="color:#4CAF50;">cita</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                      >
                        <v-card>
                          <v-card-text>
                            <v-row justify="center">
                              <v-col
                                cols="12"
                                sm="12"
                              >
                                <v-menu
                                  ref="menu"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :return-value.sync="date"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date"
                                      label="Fecha"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                  >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      text
                                      color="fondo"
                                      @click="menu = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="fondo"
                                      @click="$refs.menu.save(date)"
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-col>
                              
                              
                              <v-col
                                cols="12"
                                sm="12"
                              >

                                <v-autocomplete
                                  :items="['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00']"
                                  label="Horario*"
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
                  Cancelar
                </v-btn>
                <v-btn
                  color="secondary"
                  @click="dialog = false"
                >
                  Cuardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      
        </v-row>
        <br />
        <br />
        <TableMain
        :titleT="title"
        :key="tablaKey"
        :headersT="headers"
        :contentT="content"
        :numberT="number"
        :loading="loading"
        :statusT="tableRequestStatus"
        :actionsT="action"
        :requiereCategoriaT="false"
        v-on:show-modal="accionItem"
        />
      </div>
      
    </v-container>
</template>
  
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllDisponibilidades,getDisponibilidadById,deleteDisponibilidad } from "@/services/Disponibilidad.js";


export default {
name: "asesoria",
components: {
    TableMain
},
data() {
    return {
        dialog: false,
        dialogVideollamada: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        headers: [
            {
            text: "Codigo",
            value: "codigo",
            width: "20%",
            align: "center"
            },
            {
            text: "Fecha",
            value: "fecha",
            width: "10%",
            align: "center"
            },
            {
            text: "hora",
            value: "hora",
            width: "10%",
            align: "center"
            },
            {
            text: "Acciones",
            value: "actions",
            width: "15%",
            align: "center"
            }
        ],
        action: [
        { description: "Editar" },
        { description: "Eliminar" }
        ],
        title: "Cita",
        content: [],
        number: 10,
        loading: false,
        tableRequestStatus: 200,
    };
},

methods: {
    loadData(){

        this.content = [{codigo:"201",fecha:"04/12/23",hora:"12:30"}];
        this.loading = true;
        try {
          const response = getAllDisponibilidades(); // Asegúrate de pasar el usuarioID si es necesario
          this.content = response.data; // Ajusta esto según la estructura de tu respuesta
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
    },
    getDisponibilidadById(id) {
      try {
        const response =  getDisponibilidadById(id); // Implementa este servicio si no lo has hecho
        return response.data; // Ajusta esto según la estructura de tu respuesta
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    editarItem(id) {
      const disponibilidad =  this.getDisponibilidadById(id);
      if (disponibilidad) {
        // Asigna los detalles al estado y abre el diálogo de edición
        this.disponibilidadEdit = disponibilidad;
        this.dialog = true;
      }
    },

    accionItem: function(item, accion){
        console.log("accion: " + JSON.stringify(item));
        if (accion === "Editar") {
            console.log("hika")
        
            
        } 
        else if (accion === "Eliminar") {
            this.itemEstandar = item;
            this.modo = 2;
            try {
               deleteDisponibilidad(item); // Implementa este servicio si no lo has hecho
              // Recarga la lista después de la eliminación
              this.loadData();
            } catch (error) {
              console.error(error);
            }
        }
    }
    
}
};
</script>
  
  
  
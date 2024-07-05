<template>
  <v-app id="inspire">
    <v-card>
      <v-tabs v-model="tab" background-color="green" dark>
        <v-tab v-for="(item, index) in items" :key="index">{{ item.tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="index">
          <v-card flat>
            <v-card-title>{{ item.tab }} </v-card-title>
            <v-card-text>
              <v-row align="center">
                <v-col cols="10">
                  <v-text-field v-model="search" label="Search" clearable solo-inverted filled append-icon="mdi-magnify"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn color="green" @click="openDialog">Registrar</v-btn>
                </v-col>
              </v-row>
              <v-data-table :headers="headers[index]" :items="filterItems(item.data)" item-key="id">
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="openEditDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteItem(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>{{ isEditing ? 'Editar Elemento' : 'Registrar Nuevo Elemento' }}</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="isEditing ? updateItem() : addItem()">
            <v-text-field v-if="tab === 0" v-model="newItem.rubro" label="Rubro"></v-text-field>
            <v-menu
              v-if="tab === 0"
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="newItem.fechaIngreso"
                  label="Fecha de Ingreso"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newItem.fechaIngreso" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="green" @click="menu = false">OK</v-btn>
                <v-btn text color="green" @click="menu = false">Cancel</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              v-if="tab === 0"
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="newItem.fechaVencimiento"
                  label="Fecha de Vencimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newItem.fechaVencimiento" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="green" @click="menu2 = false">OK</v-btn>
                <v-btn text color="green" @click="menu2 = false">Cancel</v-btn>
              </v-date-picker>
            </v-menu>
            <v-text-field v-if="tab === 0" v-model="newItem.frascos" label="Frascos" type="number"></v-text-field>
            <v-text-field v-if="tab === 0" v-model="newItem.marca" label="Marca"></v-text-field>
            <v-text-field v-if="tab === 0" v-model="newItem.dosis" label="Dosis"></v-text-field>
            <v-text-field v-if="tab === 0" v-model="newItem.mlAnimal" label="ml/Animal" type="number"></v-text-field>
            <v-select v-if="tab === 0" v-model="newItem.especie" :items="['Pollo', 'Chancho']" label="Especie"></v-select>
            <v-textarea v-if="tab === 0" v-model="newItem.observaciones" label="Observaciones"></v-textarea>

            <!-- Default fields for other tabs -->
            <v-text-field v-if="tab !== 0" v-model="newItem.name" label="Name"></v-text-field>
            <v-text-field v-if="tab !== 0" v-model="newItem.age" label="Age" type="number"></v-text-field>
            <v-btn type="submit" color="green">{{ isEditing ? 'Actualizar' : 'Registrar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      search: '',
      dialog: false,
      menu: false,
      menu2: false,
      isEditing: false,
      editIndex: -1,
      newItem: {
        rubro: '',
        fechaIngreso: '',
        fechaVencimiento: '',
        frascos: '',
        marca: '',
        dosis: '',
        mlAnimal: '',
        especie: '',
        observaciones: '',
        name: '',
        age: ''
      },
      items: [
        {
          tab: 'Datos del producto',
          data: [
            {
              id: 1,
              rubro: 'Rubro A',
              fechaIngreso: '2024-05-31',
              fechaVencimiento: '2024-12-31',
              frascos: 10,
              marca: 'Marca A',
              dosis: '10mg',
              mlAnimal: 5,
              especie: 'Pollo',
              observaciones: 'Ninguna'
            },
            {
              id: 2,
              rubro: 'Rubro B',
              fechaIngreso: '2024-06-01',
              fechaVencimiento: '2025-01-01',
              frascos: 15,
              marca: 'Marca B',
              dosis: '15mg',
              mlAnimal: 7,
              especie: 'Chancho',
              observaciones: 'Ninguna'
            }
          ]
        },
        { tab: 'Consumo del producto', data: [] },
        // Add more tab data as needed
      ],
      headers: [
        [
          { text: 'ID', value: 'id' },
          { text: 'Rubro', value: 'rubro' },
          { text: 'Fecha de Ingreso', value: 'fechaIngreso' },
          { text: 'Fecha de Vencimiento', value: 'fechaVencimiento' },
          { text: 'Frascos', value: 'frascos' },
          { text: 'Marca', value: 'marca' },
          { text: 'Dosis', value: 'dosis' },
          { text: 'ml/Animal', value: 'mlAnimal' },
          { text: 'Especie', value: 'especie' },
          { text: 'Observaciones', value: 'observaciones' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        [
          { text: 'ID', value: 'id' },
          { text: 'Rubro', value: 'rubro' },
          { text: 'Fecha de Salida', value: 'fechaSalida' },
          { text: 'N° Dosis', value: 'dosis' },
          { text: 'Lote', value: 'lote' },
          { text: 'Personal Solicitante', value: 'personalSolicitante' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],  
      ],
    };
  },
  methods: {
    filterItems(items) {
      return items.filter(item => {
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    openDialog() {
      this.isEditing = false;
      this.resetNewItem();
      this.dialog = true;
    },
    openEditDialog(item) {
      this.isEditing = true;
      this.editIndex = this.items[this.tab].data.findIndex(i => i.id === item.id);
      Object.assign(this.newItem, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items[this.tab].data.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.items[this.tab].data.splice(index, 1);
      }
    },
    resetNewItem() {
      this.newItem = {
        rubro: '',
        fechaIngreso: '',
        fechaVencimiento: '',
        frascos: '',
        marca: '',
        dosis: '',
        mlAnimal: '',
        especie: '',
        observaciones: '',
        name: '',
        age: ''
      };
    },
    addItem() {
      const id = this.items[this.tab].data.length + 1;
      if (this.tab === 0) {
          this.items[this.tab].data.push({
          id: id,
          rubro: this.newItem.rubro,
          fechaIngreso: this.newItem.fechaIngreso,
          fechaVencimiento: this.newItem.fechaVencimiento,
          frascos: parseInt(this.newItem.frascos),
          marca: this.newItem.marca,
          dosis: this.newItem.dosis,
          mlAnimal: parseInt(this.newItem.mlAnimal),
          especie: this.newItem.especie,
          observaciones: this.newItem.observaciones
          });
      } else if (this.tab === 1) {
          this.items[this.tab].data.push({
          id: id,
          rubro: this.newItem.rubro,
          fechaSalida: this.newItem.fechaSalida,
          dosis: parseInt(this.newItem.dosis),
          lote: parseInt(this.newItem.lote),
          personalSolicitante: this.newItem.personalSolicitante
          });
      } else {
          this.items[this.tab].data.push({
          id: id,
          name: this.newItem.name,
          age: parseInt(this.newItem.age)
          });
      }
      this.resetNewItem();
      this.dialog = false;
      },
    updateItem() {
      if (this.tab === 0) {
        Object.assign(this.items[this.tab].data[this.editIndex], {
          rubro: this.newItem.rubro,
          fechaIngreso: this.newItem.fechaIngreso,
          fechaVencimiento: this.newItem.fechaVencimiento,
          frascos: parseInt(this.newItem.frascos),
          marca: this.newItem.marca,
          dosis: this.newItem.dosis,
          mlAnimal: parseInt(this.newItem.mlAnimal),
          especie: this.newItem.especie,
          observaciones: this.newItem.observaciones
        });
      } else {
        Object.assign(this.items[this.tab].data[this.editIndex], {
          name: this.newItem.name,
          age: parseInt(this.newItem.age)
        });
      }
      this.resetNewItem();
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
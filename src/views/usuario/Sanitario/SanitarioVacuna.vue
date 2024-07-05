<template>
  <v-col :cols="cols" :md="md">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="internalValue"
          outlined
          :label="label"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="internalValue"
        no-title
        scrollable
        locale="es"
        @input="updateValue"
      ></v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => new Date().toISOString().substr(0, 10) // Valor predeterminado como fecha de hoy
    },
    label: {
      type: String,
      required: true
    },
    cols: {
      type: [Number, String],
      default: 12
    },
    md: {
      type: [Number, String],
      default: 4
    }
  },
  data() {
    return {
      menu: false,
      internalValue: this.value // Inicializar con el valor de la prop
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue; // Actualizar el valor interno cuando la prop cambie
    }
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue); // Emitir el evento de actualización
      this.internalValue = newValue; // Actualizar el valor interno
    }
  }
};
</script>

<style scoped>
/* Tu estilo aquí */
</style>

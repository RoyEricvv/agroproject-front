<template>
  <v-app id="inspire">
    <v-card>
      <v-tabs v-model="tab" background-color="green" dark>
        <v-tab v-for="(item, index) in items" :key="index">{{ item.tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="index">
          <v-card flat>
            <v-card-text>
              <div v-if="item.tab === 'Datos del producto'">
                <RegistroSanitario :prop_granja_nombre="'Antibiótico'"/>
              </div>
              <div v-if="item.tab === 'Consumo del producto'">
                {{ item.content }}
              </div>
              
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import RegistroSanitario from "@/components/RegistroSanitario.vue";

export default {
  components: {
    RegistroSanitario
  },
  data() {
    return {
      tab: 0,
      items: [
        {
          tab: 'Datos del producto',
          content: 'Datos del producto'
        },
        {
          tab: 'Consumo del producto',
          content: 'Consumo del producto'
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>

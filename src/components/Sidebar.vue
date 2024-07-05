<template>
  <v-navigation-drawer
    app
    v-model="drawerP"
    color="#00A884"    
  >
  <!-- src="../assets/granja.jpg" -->
    <v-divider></v-divider>
    <br />
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="title white--text">
            {{ nameSidebar }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-expansion-panels flat>
        <template v-for="item in items">
          <v-expansion-panel v-if="item.children" :key="item.title" >
            <v-expansion-panel-header class="custom-expansion-panel-content">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="custom-expansion-panel-content">
              <v-list>
                <v-list-item
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.link"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title class="white--text">{{ child.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-list-item v-else :key="item.title" :to="item.link" link>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-expansion-panels>


      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  props: {
    drawerP: {
      type: Boolean,
      default: false
    },
    nameSidebarP: {
      type: String,
      default: "Nombre Sidebar"
    },
    itemsP: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nameSidebar: this.nameSidebarP,
      items: this.itemsP,
      drawer: true
    };
  },
  methods: {
    ...mapState(["generalConfig"])
  }
};
</script>
<style scoped>
.custom-expansion-panel-content {
  background-color: #00A884;
  color: white
}
</style>
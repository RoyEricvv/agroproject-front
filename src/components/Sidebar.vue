<template>
  <v-navigation-drawer
    app
    v-model="drawerP"
    color="accent"
    src="https://papers.co/wallpaper/papers.co-sm44-blue-dark-blur-gradation-36-3840x2400-4k-wallpaper.jpg"
  >
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

      <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" class="white--text">
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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

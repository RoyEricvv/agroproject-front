<template>
    <v-container
      class="fondo"
      fluid
      style="lef-margin: 0px; padding: 0px; width: 95%"
    >
      <div>
        <h1 style="color:grey;">Videollamada</h1>
        <br />
        <div class="embedded-page">
            <iframe :src="url" width="100%" height="1500px" frameborder="0"></iframe>
        </div>
        
      </div>
    </v-container>
  </template>
  
  <script>

  export default {
    name: "App",
    components: {
      
    },
    data() {
      return {
        url: "https://webrtc-demo-simple.web.app/?room=123", 
      };
    },
  
  };
  </script>
  
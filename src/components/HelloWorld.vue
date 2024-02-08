<template>
  
  <v-container>
    
    <v-app-bar
      app
      color="red-lighten-2"
      dark
    >
    </v-app-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.jpg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4" offset-md="4" class="text-center">
        <v-btn block   height="72" min-width="15" color="#BCAAA4" rounded="xl" @click="GoToPropinas">Pago de Propinas</v-btn>
      </v-col>

      <!--<v-col md="12">
        <message></message>
      </v-col>-->

    
      

    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import message from '@/components/message.vue';

  export default Vue.extend({
  components: { message },
    name: 'HelloWorld',

    methods:{
      GoToPropinas(){
        console.log("Hola mundo propinas");
        this.$router.push({name:"propinas"});
      }
    }
  })
</script>

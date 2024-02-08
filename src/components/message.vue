<template>
  <div>
    <h1>Mi componente Vue</h1>
    <button @click="fetchData">Obtener datos del backend</button>
  </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
  methods: {
    async fetchData() {
      try {
        const response = await apiClient.get('/');
        console.log(response.data); // Manejar la respuesta del backend aquí
      } catch (error) {
        console.error('Error al realizar la solicitud al backend:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>

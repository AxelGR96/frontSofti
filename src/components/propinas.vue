<template>
   <div>
        <v-row>
            <v-col cols="12" md="6" offset-md="1" class="mt-8">
                <span class="text-h5">Pago de Propinas</span>
            </v-col>
            
            <v-col cols="12" md="5">
                <v-row class="text-center">
                    <v-col cols="12" md="12" class="mt-2">
                        <span>Efectivo en Caja</span>
                    </v-col>

                    <v-col cols="12" md="6" offset-md="3" class="mt-n5">
                        <v-card
                        class="mx-auto"
                        width="200"
                        height="60"
                        color="#FFCDD2"
                        >
                            <v-card-text class="text-h4">
                                <span class="text-h5">{{ formatCurrency(totalAmount) }}</span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="12">
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row class="text-center">
        
            <v-col cols="12" md="4">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-row>
                            <v-col cols="12" md="12">
                                <span class="text-body-1" color="#FFCDD2">Total de propinas</span>
                            </v-col>
                            <v-col cols="12" md="12" class="mt-n4">
                                <v-row>
                                    <v-col cols="12" md="5" offset-md="3">
                                        <v-text-field
                                        label="$"
                                        outlined
                                        v-model="display"
                                        class="rounded-text-field"
                                        :disabled="blocked"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="1" class="ml-n4 mt-1">
                                        <v-btn icon @click="pencilUnlock()">
                                            <v-icon color="#000000">mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                

                            </v-col>

                            <v-col cols="12" md="12" class="mt-n6">
                                <span class="text-h5">¿Entre cuantós quieres dividir la propina?</span>
                            </v-col>
                            
                            <v-col v-if="display === '' && employees != '' || display === null && employees != null" cols="12" md="12" class="mt-2">
                                <v-alert
                                    density="compact"
                                    type="warning"
                                    title="Alert title"
                                    text="Por favor, ingrese un valor en el campo Total de propinas"
                                >Por favor, ingrese un valor en el campo Total de propinas</v-alert>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-row>
                                    <v-col cols="12" md="4" offset-md="2">
                                        <v-text-field v-model="employees" outlined label="#" class="rounded-text-field"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" class="mt-2">
                                        <span class="text-h5" color="#FFCDD2">{{ formatCurrency(amount) }}  x Persona</span>
                                        

                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-icon class="mb-1">mdi-credit-card</v-icon>
                                <span class="text-h5 font-weight-bold ml-2">Elige el Metodo de Pago</span>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-row>
                                    <v-col cols="12" md="4" offset-md="2">
                                        <v-card
                                            class="button-card"
                                            :class="{ 'active': selectedCard === 'efectivo' }"
                                            @click="selectCard('Efectivo')"
                                        >
                                            <v-card-text>
                                            <v-icon size="50" color="#000000">mdi-cash-check</v-icon>
                                            <span class="text-body-1 font-weight-bold">Efectivo</span>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-card
                                            class="button-card"
                                            :class="{ 'active': selectedCard === 'bbva' }"
                                            @click="selectCard('BBVA')"
                                        >
                                            <v-card-text>
                                            <v-icon size="50" color="#000000">mdi-credit-card</v-icon>
                                            <span class="text-body-1 font-weight-bold">BBVA 1234</span>
                                            </v-card-text>
                                            </v-card>
                                    </v-col>

                                    <v-col cols="12" md="4" offset-md="2">
                                        <v-card
                                            class="button-card"
                                            :class="{ 'active': selectedCard === 'santander' }"
                                            @click="selectCard('Santander')"
                                        >
                                            <v-card-text>
                                            <v-icon size="50" color="#000000">mdi-credit-card</v-icon>
                                            <span class="text-body-1 font-weight-bold">Santander 1234</span>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title class="headline">Calculadora</v-card-title>
                    <v-card-text>
                    <v-text-field v-model="display" outlined readonly></v-text-field>
                    <v-row>
                        <v-col v-for="button in buttons" :key="button.text" cols="3">
                        <v-btn @click="handleButtonClick(button)">{{ button.text }}</v-btn>
                        </v-col>
                    </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-row>
                    <v-col cols="12" md="12">
                        <span class="text-h5">Pagos</span>
                    </v-col>

                    <v-col cols="12" md="6" offset-md="3" v-if="backData.length == 0">
                        <v-card class="rounded-card"  outlined>
                            <v-card-text class="text-center">
                            <span class="font-weight-bold">Sin Pagos</span>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6" offset-md="3"  v-for="cash in backData" :key="cash._id">
                        

                        <v-card class="rounded-card"  outlined>
                            <v-card-text class="text-center">
                            <span class="font-weight-bold text-subtitle-1" style="color:black;">
                                <v-icon style="color:black;" v-if="cash.card == 'Efectivo'">mdi-cash-check</v-icon><v-icon style="color:black;" v-else>mdi-credit-card</v-icon>  {{ cash.card }} {{ formatCurrency(cash.amount) }}</span>
                                
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        
        </v-row>

        <v-row>
            <v-col cols="12" md="2" offset-md="1">
                <v-row>
                    <v-col cols="12" md="12">
                        <span class="text-h5" style="color: #EF9A9A">Total a Pagado:</span>
                    </v-col>

                    <v-col cols="12" md="12">
                        <span class="text-h5">Restante por pagar</span>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="2">
                <v-row>
                    <v-col cols="12" md="12">
                        <span class="text-h5" style="color:#EF9A9A">{{ formatCurrency(totalAmount) }}</span>
                    </v-col>

                    <v-col cols="12" md="12">
                        <span class="text-h5">{{ formatCurrency(display) }}</span>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="5">
                <v-btn block :disabled="pay" @click="sendData">Pagar Propinas</v-btn>
            </v-col>
        </v-row>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import apiClient from '@/services/api';

interface Button {
    text: string;
    action?: string;
}
export default Vue.extend({
    name: 'propinas',
    data: () => ({
        intervalId: null as null | number, // Inicializa intervalId como null
        blocked: true,
        totalAmount: 0, 
        display: '0',
        backData: '',
        pays: '0',
        selectedCard: null,
        pay: true,
        employees: '0',
        buttons: [
        { text: '1' }, { text: '2' }, { text: '3' }, { text: '/' },
        { text: '4' }, { text: '5' }, { text: '6' }, { text: '*' },
        { text: '7' }, { text: '8' }, { text: '9' }, { text: '-' },
        { text: '00' }, { text: '0' }, { text: '=' }, { text: '+' },
        { text: 'C', action: 'clear' }, { text: 'AC', action: 'allClear' }
      ]
    }),
    methods:{

    
    handleButtonClick(button: Button) {
    switch (button.action) {
        case 'clear':
            this.display = this.display.slice(0, -1);
            break;
        case 'allClear':
            this.display = '0';
            break;
        case '=':
            this.display = eval(this.display).toString();
            break;
        default:
            if (this.display === '0' || !this.display.trim()) {
                this.display = button.text;
            } else {
                this.display += button.text;
            }
            break;
    }
    },

    formatCurrency(value: string | number): string {
    // Verifica si el valor es un número o no
    if (!isNaN(parseFloat(String(value))) && isFinite(Number(value))) {
        // Si es un número, lo formatea y devuelve
        return Number(value).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
        });
    } else {
        // Si no es un número, devuelve "$0.00"
        return '$0.00';
    }
    },

    selectCard(card: null) {
    if (card !== null) {
        this.selectedCard = card;
    } else {
        this.selectedCard = null;
    }
    console.log("cards", this.selectedCard);
    this.pay = false;
    },

    pencilUnlock(){
        this.blocked = false;
    },

    async sendData(){       
        const payment = {amountToPay: this.amount,card: this.selectedCard};
        try {
            const response = await apiClient.post('http://localhost:3000/pago',payment);
            console.log(response.data); // Manejar la respuesta del backend aquí
        } catch (error) {
            console.error('Error al realizar la solicitud al backend:', error);
            }
    },

    async getData(){
            try {
                const response = await apiClient.get('/pagosHechos');
                console.log('Tipo de datos en backData:', typeof response.data);
                console.log('Datos de pago recibidos desde el backend:', response.data);
                this.backData = response.data;
                console.log("backdata: ",this.backData);
            } catch (error) {
                console.error('Error al obtener datos de pago desde el backend:', error);
            }         
    },
    getTotalAmount() {
        // Verificar si backData es un array y no está vacío
        if (Array.isArray(this.backData) && this.backData.length > 0) {
            // Utilizar reduce para sumar los montos de todos los objetos en backData
            return this.backData.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
        } else {
            return 0; // Si no hay datos, devuelve 0
        }
    }
    },
    computed: {
    amount() {
    const displayNumber = parseFloat(this.display);
    const employeesNumber = parseInt(this.employees);
    // Verificar si la conversión es válida
    if (!isNaN(displayNumber) && !isNaN(employeesNumber) && employeesNumber !== 0) {
      return displayNumber / employeesNumber;
    } else {
      return 0; // Otra valor por defecto o manejo de error
    }
 },
  },
  watch: {
    employees(newVal) {
    console.log(newVal);
   
    const displayNumber = parseFloat(this.display);
    const employeesNumber = parseInt(newVal);
    if (!isNaN(displayNumber) && !isNaN(employeesNumber) && employeesNumber !== 0) {
      this.amount = displayNumber / employeesNumber;
    } else {
      this.amount = 0;
    }
    console.log(this.amount);
  },
  backData: {
      handler(newVal) {
        this.totalAmount = this.getTotalAmount();
      },
      immediate: true
    }
  },
  mounted(){
    this.getData();
   
    this.intervalId = setInterval(() => {
            this.getData();
        }, 5000); 
    this.totalAmount = this.getTotalAmount();
  },
  
  beforeDestroy() {
      
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
    }
  })
</script>

<style>
.rounded-text-field .v-text-field__slot input {
  border-radius: 20px;
}

.button-card {
  cursor: pointer;
}

.button-card:hover,
.button-card:active,
.button-card:focus {
  background-color: #E53935;
}

.active {
  background-color: #E53935;
  color: white;
}

.rounded-card {
  border-radius: 20px; /* Ajusta el radio para redondear los bordes */
  width: 300px; /* Ajusta el ancho de la tarjeta según tus necesidades */
  background-color: #f0f0f0; /* Cambia el color de fondo si lo deseas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Añade sombra para efecto visual */
}
</style>

import './assets/main.sass'

import { createApp } from 'vue'

import {Service} from "./Scripts/MainServices/Service";


import App from './App.vue'

const app = createApp(App)

const service = new Service(app);

service.DataService.getGlobalVariables();

app.mount('#app')

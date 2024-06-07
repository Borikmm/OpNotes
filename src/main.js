import './assets/main.sass'

import { createApp } from 'vue'
import { ref } from 'vue'
import App from './App.vue'

const app = createApp(App)



const blocks_list = ref([])
const up_panel_height = ref(0)
const left_panel_width = ref(0)
const old_selected_block = ref(0)


app.provide('GlobalBlocksList', blocks_list)
app.provide('Up_panel_height', up_panel_height)
app.provide('Left_panel_width', left_panel_width)
app.provide('Old_selected_block', old_selected_block)

app.mount('#app')

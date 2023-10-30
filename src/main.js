import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/app.css'
import axios from "axios";
import Cookies from 'js-cookie';

const instance = axios.create({
    withCredentials: true,
    
    baseURL: "http://13.234.17.232",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});



const app = createApp(App)
app.use(router)
app.use(Cookies)
app.config.globalProperties.$instance = instance
app.config.globalProperties.$serverURL =  "http://13.234.17.232"
app.config.globalProperties.$Services = []
app.config.globalProperties.$myServices = []
app.config.globalProperties.$user = []
app.config.globalProperties.$Cookies = Cookies
app.mount('#app')

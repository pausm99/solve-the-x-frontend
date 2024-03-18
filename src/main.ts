import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { configureResponseInterceptor, configureRequestInterceptor } from './services/interceptors';


configureResponseInterceptor();
configureRequestInterceptor();


createApp(App)
  .use(router)
  .mount('#app');

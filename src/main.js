import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueLazyload from 'vue3-lazyload'; // 引入 vue3-lazyload
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 使用 vue3-lazyload
app.use(VueLazyload, {
  loading: 'path/to/loading-image.jpg', // 可選，載入中顯示的占位符
  error: 'path/to/error-image.jpg'      // 可選，載入失敗顯示的圖像
});

app.mount('#app');

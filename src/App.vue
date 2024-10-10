<template>
  <div id="app">
    <!-- 如果當前頁面不是 IntroPage 才顯示 header -->
    <header-component v-if="!isIntroPage"></header-component>
    <router-view />
    <footer-Component v-if="!isIntroPage"></footer-Component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'; // 正確引入 Header 組件
import FooterComponent from '@/components/footer.vue'
export default {
  components: {
    HeaderComponent, 
    FooterComponent
  },
  computed: {
    // 讓Intro header 不顯示
    isIntroPage() {
      return this.$route.path === '/'; 
    }
  },
  name: 'App',
};
</script>

<style>
/* 你可以保留這裡的全域樣式設定 */
</style>

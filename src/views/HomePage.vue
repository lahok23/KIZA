<template>
  <div class="HomePage-wrap" >
    <!-- 上方 -->
    <!-- banner -->
    <div class="banner" >
      <img src="@/assets/image/毛.png" alt="banner" />
      <div class="text-banner">
        <h1>通往學習文化的路上</h1>
        <ul>
          <li><router-link to="/festival">探索文化</router-link></li>
          <li><router-link to="/meals">文化指南</router-link></li>
        </ul>
      </div>
    </div>

    <!-- 第一個內容 介紹 -->
    <section class="container" >
      <div class="content">
        <div class="item" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000">
          <i class="ph ph-leaf"></i>
          <h4>土地文化</h4>
          <p>
            這片土地上生活的人雖然有著不同的背景和文化，但他們都是土地上的一部分。
          </p>
        </div>
        <div class="item" 
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000">
          <i class="ph ph-house"></i>
          <h4>奇萊平原</h4>
          <p>
            花蓮市是撒奇萊雅族世居地，原意為「真正的人」。
          </p>
        </div>
        <div class="item"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000">
          <i class="ph ph-map-trifold"></i>
          <h4>部落導覽</h4>
          <p>
            若是想更深入認識原住民文化，就找專業的部落導覽員吧！
          </p>
        </div>
      </div>
    </section>

    <!-- 第二影片過度 -->
    <section class="container2" >
      <video  src="@/assets/video/阿美族.mp4" autoplay muted playsinline></video>
    </section>

    <!-- 第三選擇文化 -->
    <section class="container3-main" 
     >
      <div class="container3" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">
        <h4 class="label">開始文化之旅</h4>
        <div class="container3-box">
          <div class="content3">
            <p>讓文化之旅開啟心靈的冒險，啟發靈魂的追尋。</p>
          </div>
        </div>
        <div class="gallery">
          <div class="box box1">
            <router-link to="/festival"><img src="https://cyberisland.teldap.tw/G/qwhcsUnebyAdefbBItDuldQ" alt="祭典"></router-link>
            <div class="text3">
              <h2>祭典</h2>
            </div>
          </div>
          <div class="box box2">
            <router-link to="/meals"><img src="https://www.foodspiritdraw.tw/wp-content/uploads/2021/01/Amis-1024x768.jpg" alt="飲食"></router-link>
            <div class="text3">
              <h2>飲食</h2>
            </div>
          </div>
          <div class="box box3">
            <router-link to="/art"><img src="https://i0.wp.com/www.fclnews.com/wp-content/uploads/2023/03/1679316922753.jpg?fit=1568%2C1044&ssl=1" alt="藝術"></router-link>
            <div class="text3">
              <h2>藝術</h2>
            </div>
          </div>
          <div class="box box4">
            <router-link to="/workshop"><img src="@/assets/image/399694620_664327975847548_4643314732394794198_n.jpg" alt="工作坊"></router-link>
            <div class="text3">
              <h2>工作坊</h2>
            </div>
          </div>
          <div class="box box5">
            <router-link to="/Room"><img src="@/assets/image/吉寶竿.jpg" alt="住宿"></router-link>
            <div class="text3">
              <h2>住宿</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import 'phosphor-icons';  

</script>

<style src="../assets/css/HomePage.css" scoped></style>

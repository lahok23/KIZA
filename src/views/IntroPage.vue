<template>
    <div class="main-container">    
  
      <div class="container">
        <nav class="main-nav">
          <ul class="ul_first">
            <li class="logo">
              <a href="#"></a>
            </li>
          </ul>
          <ul class="ul_second">
            <li><router-link to="/homepage">進入網站</router-link></li>
          </ul>
        </nav>
  <!-- 第一頁 -->
        <section class="page1">
          <div id="summer" class="summer">
            <video autoplay loop muted plays-inline playsinline class="back-video">
              <source src="../assets/video/奇萊.mp4" type="video/mp4" />
            </video>
            <div class="content">
              <h1>奇萊祭典</h1>
              <h2>KIZA Malalikid</h2>
              <h4>
                8月———<span class="path"></span>———10月
              </h4>
            </div>
          </div>
        </section>
  
        <div class="scroll-hint">
          <p class="animate__animated animate__pulse animate__repeat-3">滾動查看更多 ➔</p>
        </div>
  <!-- 第二頁 -->
        <section class="page2">
          <div id="summer" class="summer">
          <video autoplay loop muted plays-inline playsinline class="back-video video2">
            <source src="../assets/video/alufu...mp4" type="video/mp4" />
          </video>
          <div class="content">
            <h1>奇萊工作坊</h1>
            <h2>KIZA Nakamayan</h2>
            <!-- 圖騰 -->
            <h4>
                    <span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span>
                  </h4>
          </div>
          </div>
        </section>
  <!-- 第三頁 -->
        <section class="page3">
          <div id="summer" class="summer">
          <video  autoplay loop muted plays-inline playsinline class="back-video video3">
            <source src="../assets/video/alifongfong.mp4" type="video/mp4" />
          </video>
          <div class="content">
            <h1>奇萊飲食</h1>
            <h2>KIZA Kemaen</h2>
  
                <!-- 圖騰 -->
                <h4>
                    <span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span>
                  </h4>
          </div>
          </div>
        </section>
  <!-- 第四頁 -->
        <section class="page4">
          <div id="summer" class="summer">
          <video autoplay loop muted plays-inline playsinline class="back-video video4">
            <source src="../assets/video/木雕.mp4" class="video4" type="video/mp4" />
          </video>
          <div class="content">
            <h1>奇萊藝術</h1>
            <h2>KIZA Diheku</h2>
                <!-- 圖騰 -->
                <h4>
                    <span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span
                    ><span
                      class="path"
                   
                    ></span>
                  </h4>
          </div>
          </div>
        </section>
      </div>
    </div>
  </template>
<style src="../assets/css/style.css" scoped></style>
  <script>
  export default {
    name: 'App',
    mounted() {
      document.addEventListener("wheel", this.handleScroll);
    },
    methods: {
  handleScroll(event) {
    event.preventDefault();
    const container = document.querySelector('.main-container');
    
    // 確認 container 存在再進行操作
    if (container) {
      const delta = Math.sign(event.deltaY);
      const scrollStep = 50;
      container.scrollLeft += delta * scrollStep;

      const scrollHint = document.querySelector('.scroll-hint');
      if (scrollHint && container.scrollLeft > 0) {
        scrollHint.style.display = 'none'; // 滾動後隱藏提示
      }
    }
  }
}

  };
  </script>
  
  
  
  
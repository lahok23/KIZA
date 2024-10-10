<template>
    <div class="header">
      <a id="logo" href="/homepage">
        <img src="@/assets/image/橫式超超小.png" alt="logo" />
      </a>
      <div class="hamburger" >
        <i class="ph-bold ph-list"></i>
      </div>
      <ul  class="navbar">
        <li>
          <router-link to="/festival" exact-active-class="active-link">祭典</router-link>
        </li>
        <li>
          <router-link to="/meals" exact-active-class="active-link">飲食</router-link>
        </li>
        <li>
          <router-link to="/art" exact-active-class="active-link">藝術</router-link>
        </li>
        <li>
          <router-link to="/workshop" exact-active-class="active-link">工作坊</router-link>
        </li>
        <li>
          <router-link to="/room" exact-active-class="active-link">住宿</router-link>
        </li>
      </ul>
      <ul class="icon">
        <li>
          <router-link to="/cart" exact-active-class="active-link">
            <i class="ph-bold ph-shopping-cart-simple"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  @import url(../assets/css/reset.css);
  
  .header {
    z-index: 100;
    display: flex;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    box-shadow: 1px 3px 5px gray;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    padding: 0px 20px;
  }
  
  .navbar {
    display: flex;
  }
  
  .navbar li {
    padding-left: 30px;
    padding-right: 40px;
    margin-right: 50px;
  }
  /* 強制蓋過 文字無法變色的困擾 */
  .navbar li a.active-link[data-v-c970699f] {
    color: crimson !important;
}

  /* 一般導航連結樣式 */
  .navbar li a {
    text-decoration: none;
    font-size: 22px;
    font-weight: 500;
    color: black;
    transition: color 0.3s ease;
    width: 20ch; /* 限制每行顯示約 20 個字元 */
  }
  
  /* 滑鼠懸停樣式 */
  .navbar li a:hover {
    color: crimson;
    border-bottom: 4px solid crimson;
    padding-bottom: 16px;
    transition: 1s;
  }
  
  /* 當前活躍的導航連結樣式 */
  .active-link {
    color: crimson ;
    border-bottom: 4px solid crimson;
    padding-bottom: 16px;
  }
  
  /* 漢堡圖標 */
  .navbar.hidden {
    display: none;
  }
  
  .hamburger {
    display: none;
    cursor: pointer;
    font-size: 28px;
  }
  
  .icon a {
    text-decoration: none;
    font-size: 22px;
    font-weight: 500;
    color: black;
  }
  
  /* 滑鼠懸停效果：購物車圖標 */
  .icon a:hover {
    color: crimson;
    border-bottom: 4px solid crimson;
    padding-bottom: 16px;
    transition: 1s;
  }
  
  /* 手機版漢堡選單與響應式設計 */
  @media (max-width: 1042px) {
    .header {
      display: flex;
      justify-content: space-between;
    }
  
    .navbar {
      display: block;
      flex-direction: column;
      width: 100%;
      position: absolute;
      top: 70px;
      left: 0;
      background-color: #fdfbfb;
      box-shadow: 1px 3px 5px gray;
    }
  
    .navbar li {
      padding: 15px 0;
      margin: 0;
      text-align: center;
    }
  
    .navbar li a {
      font-size: 20px;
    }
  
    .hamburger {
      display: block;
    }
  
    .icon {
      display: none;
    }
  }
  </style>
  
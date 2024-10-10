<template>
  <div class="wrap">
    <!-- Banner 區塊，顯示頁面標題和背景圖片 -->
    <div class="banner">
      <img src="../assets/image/阿里鳳鳳超清晰.JPG" alt="banner" />
      <div class="text-banner">
        <h2>飲食</h2>
        <h1>交織成細密而又豐富的食文化</h1>
      </div>
    </div>

    <!-- 產品列表區域 -->
    <section>
      <h2>選擇飲食</h2>
      <ul class="course">
        <!-- 使用 v-for 遍歷 products 來動態生成產品列表 -->
        <li class="card-item" v-for="item in products" :key="item.id">
          <!-- 產品圖片 -->
          <div class="card-image">
            <img :src="item.image" alt="product-image" />
          </div>

          <!-- 產品信息，名稱、發音、描述、價格及購買按鈕 -->
          <ul>
            <h3>{{ item.name }}</h3>
            <p>
              {{ item.pronunciation }}
              <span>
                <!-- 點擊播放對應的音頻 -->
                <i class="ph-bold ph-speaker-high" @click="playAudio(item.audio, $event)"></i>
              </span>
            </p>
            <!-- 產品詳細描述 -->
            <span class="subtitle">{{ item.description }}</span>
            <li>
              <a href="#">金額</a>
              <span class="price">{{ item.price }} 元</span>
            </li>
            <!-- 購買按鈕，點擊觸發 showPurchaseModal 方法 -->
            <button class="btn-filled-dark" @click="showPurchaseModal(item)">購買</button>
          </ul>
        </li>
      </ul>
    </section>

    <!-- 購物數量彈出 Modal，顯示購物數量輸入 -->
    <div id="quantityModal" v-if="showModal" class="modal">
      <div class="modal-content">
        <img src="../assets/image/橫式超超小.png" alt="logo" />
        <!-- 關閉彈窗按鈕 -->
        <span class="close" @click="closeModal">&times;</span>

        <!-- 輸入購買數量的框，通過 v-model 雙向綁定數量 -->
        <p>請輸入購買數量:</p>
        <input type="number" v-model="quantity" min="1" max="50" />

        <!-- 顯示購買總額 -->
        <p>{{ totalAmount }} 元</p>

        <!-- 確認購買按鈕，點擊後確認購買 -->
        <button @click="confirmPurchase" class="btn-filled-dark">確定</button>

        <!-- 成功購買提示 -->
        <p v-if="purchaseSuccess" style="color: green">購買成功！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'; // 引入 Pinia store

export default {
  name: 'Meals',
  data() {
    return {
      showModal: false, // 購物數量彈窗
      quantity: 1, // 購買數量
      purchaseSuccess: false, // 購買成功提示
      currentProduct: null, // 當前選中的產品
      products: [
      {
        id: 1,
        name: "情人的眼淚",
        pronunciation: "lalupela",
        image: "../src/assets/image/情人的眼淚.jpg",
        price: 70,
        audio: "../src/assets/video/lalupela.mov",
        description: "雨來菇，是古時雨後在山坡、草皮上就能採到的野菜，阿美族傳說中曾有一對私奔戀人最後因無力逃跑，在草原上相擁而亡，而兩人滴下的眼淚就化為一朵朵的雨來菇，因此雨來菇又稱「情人的眼淚」。"
      },
      {
        id: 2,
        name: "鹹豬肉",
        pronunciation: "siraw",
        image: "https://dcm.s3.hicloud.net.tw/new/collection/2020-10-16/94dbd3ea-e8f7-4d83-a538-71d4c91348f9/e64e5370-0282-4b96-984b-12aeeec2d35a.jpg",
        price: 300,
        audio: "../src/assets/video/siraw.mov",
        description: "喜烙是原住民非常具有代表性的傳統食材，幾乎是族人們從小吃到大，喜烙就是醃生豬肉，用粗鹽醃製，經過發酵後的豬肉風味獨特，酸酸鹹鹹的滋味，讓許多初次嘗試的朋友都留下深刻的印象。"
      },
      {
        id: 3,
        name: "藤心",
        pronunciation: "dungec",
        image: "../src/assets/image/藤心.jpg",
        price: 120,
        audio: "../src/assets/video/dungec.mov",
        description: "阿美族人招待貴賓時，藤心是不可缺少的食物，部落耆老則喜歡將其煮湯，喝它的甘苦原味。阿美族部落流傳「吃藤心，壽命如藤條一般長」，顥示族人相信藤心對健康相當有助益。"
      },
      {
        id: 4,
        name: "劍筍",
        pronunciation: "adeci",
        image: "../src/assets/image/劍筍.jpg",
        price: 100,
        audio: "../src/assets/video/箭筍.mov",
        description: "劍筍是台灣特有種，阿美族人傳統的吃法是和鹹豬肉或排骨一起熬湯，或是和鹹豬肉、辣椒一起炒，在以前會在還未剝外皮時將它拿去烤再淋上烤鹹豬肉的油也別有一番風味。"
      },
      {
        id: 5,
        name: "阿里鳳鳳",
        pronunciation: "alibungbung",
        image: "../src/assets/image/阿里鳳鳳超清晰.JPG",
        price: 60,
        audio: "../src/assets/video/alifunfung.mov",
        description: "阿美族傳統社會中，妻子會準備給外出的丈夫，稱為「情人粽」，採集葉子去除葉骨跟刺，編織成袋狀，再將糯米、鹹豬肉放入，蒸煮後成為愛心便當。"
      },
      {
        id: 6,
        name: "糯米飯",
        pronunciation: "hakhak",
        image: "../src/assets/image/hakhak.jpg",
        price: 30,
        audio: "../src/assets/video/hakhak.mov",
        description: "「HakHak」是阿美族的傳統料理，用糯米蒸煮後搭配菜食用。一般部落配鹹魚乾、醃豬肉等，在慶典、婚喪喜慶及重大節日才會吃得到。"
      }
    ],

    };
  },
  computed: {
    totalAmount() {
      if (this.currentProduct) {
        return this.quantity * this.currentProduct.price;
      }
      return 0;
    },
  },
  methods: {
    playAudio(audioSrc, event) {
      const audio = new Audio(audioSrc);
      audio.play();
      const icon = event.currentTarget;
      icon.classList.add("clicked");

      audio.addEventListener("ended", () => {
        icon.classList.remove("clicked");
      });
    },
    showPurchaseModal(product) {
      this.currentProduct = product;
      this.showModal = true;
      this.quantity = 1;
    },
    confirmPurchase() {
      const cartStore = useCartStore(); // 使用 Pinia 的購物車 store
      cartStore.addToCart({
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        quantity: this.quantity,
        image: this.currentProduct.image,
      });

      this.purchaseSuccess = true;
      setTimeout(() => {
        this.purchaseSuccess = false;
        this.closeModal();
      }, 2000);
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
  
  <style scoped>
@import url(../assets//css/reset.css);

.wrap {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-image: url('../src/assets/image/背景背景.png');

  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}


 
.banner {
  position: relative;
}

.banner img {
  width: 100%;
  height: 68vh;
  opacity: 90%;
  object-fit: cover;
  filter: brightness(60%);
}

.text-banner {
  position: absolute;
  color: white;
  top: 45%;
  left: 5%;
  line-height: 50px;
  width: 100%;
}

.text-banner h2 {
  font-size: 2rem;
}

.text-banner h1 {
  font-size: 3rem;
  font-weight: bold;
}

.course {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
}

.card-item {
  width: 49%;
  display: flex;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.card-item:hover {
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  transform: scale(1.01);
}

.card-image {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.card-image > img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: initial;
}

.card-item a {
  text-decoration: none;
  font-weight: 600;
}

.card-item > ul {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  flex: 1;
  color: #45413e;
  padding: 0 40px 40px;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
}

.card-item > ul > li a {
  line-height: 32px;
  font-size: 14px;
}

.card-item a {
  color: #45413e;
}

button {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  padding: 12px 24px;
  border-radius: 48px;
  display: flex;
  flex-direction: row;
  grid-gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

button.btn-outline-light {
  color: #f9f9f9;
  background: none;
  border: 2px solid #f9f9f9;
}

button.btn-outline-dark {
  color: #45413e;
  background: none;
  border: 2px solid #45413e;
}

button.btn-filled-dark {
  color: #f9f9f9;
  background: #45413e;
}

button:hover {
  color: #f9f9f9;
  border: 2px solid #f4cfc6;
  background: #d51f1f;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
}

.card-med > .card-image {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}

section {
  padding: 50px;
}

section h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  color: #45413e;
  margin-bottom: 32px;
}

.card-item {
  flex-direction: row;
  padding: 0;
  margin-bottom: 40px;
}

.card-item .card-image {
  width: 50%;
  border-radius: 0;
}

.card-item > ul {
  padding: 40px;
}

.card-item > ul > li span {
  font-size: 16px;
  padding-left: 5px;
}

.card-item .subtitle {
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: 24px;
}

.card-item button {
  margin-top: auto;
}

/* footer */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 80px;
  background-color: rgb(88, 88, 88);
}

.footer .footer-icon {
  font-size: 32px;
  display: flex;
}

.footer-icon li {
  padding: 20px;
}

.footer-icon li a {
  color: #ffffff;
  text-decoration: none;
}

.footer-icon a:hover {
  font-size: 40px;
  transition: 1s;
}
.subtitle {
  font-size: 14px;
  color: #555;
}

.price {
  font-weight: bold;
}


/* 圖片文字rwd */
@media (max-width: 768px) {
  .text-banner h2 {
    font-size: 1.5rem;
  }
  .text-banner h1 {
    font-size: 2rem;
  }
}


/* cardrwd */
@media (max-width: 1042px) {
  .course {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
  }
  .card-image {
    height: auto;
  }
  .banner img {
    height: auto;
  }
}

.modal {
  position: fixed;
  z-index: 9999; /* 確保視窗在最上層 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* 允許用戶滾動視窗內容 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}

.modal-content {
  background-color: #f9f9f9; /* 內容區域背景色 */
  margin: 15% auto; /* 將視窗垂直居中 */
  line-height: 30px;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加陰影效果 */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: crimson; /* 滑鼠懸停時的背景色 */
}

#purchaseSuccess {
  color: crimson; /* 設置文字顏色為綠色 */
  text-align: center; /* 文字置中 */
  margin-top: 10px; /* 上邊距10像素 */
}

.clicked {
  color: red;
}

  </style>
  
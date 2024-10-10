<template>
  <div class="wrap">
    <!-- Banner -->
    <div class="banner">
      <img src="../assets/image/黃聖安01.JPG" alt="tony" />
      <div class="text-banner">
        <h2>藝術</h2>
        <h1>延續文化脈動的傳承者</h1>
      </div>
    </div>

    <!-- 商品選擇區域 -->
    <section>
      <h2>選擇藝術商品</h2>
      <ul class="course">
        <li v-for="(item, index) in products" :key="index" class="card-item">
          <div class="card-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <ul>
            <div class="coursetext">
              <h3>{{ item.name }}</h3>
              <p>{{ item.artist }}</p>
            </div>
            <br />
            <span class="subtitle">{{ item.description }}</span>
            <li>
              <a href="#">金額</a>
              <span class="price">{{ item.price }}元</span>
            </li>
            <button class="btn-filled-dark" @click="openModal(item)">購買</button>
          </ul>
        </li>
      </ul>
    </section>

    <!-- 購買數量彈窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <img src="../assets/image/橫式超超小.png" alt="logo" />
        <span class="close" @click="closeModal">&times;</span>
        <p>請輸入購買數量:</p>
        <input type="number" v-model="quantity" min="1" max="50" />
        <p>總金額: {{ totalAmount }}元</p>
        <button @click="confirmPurchase" class="btn-filled-dark">確定</button>
        <p v-if="purchaseSuccess" style="color: green">購買成功！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore"; // 引入 Pinia 的購物車 store

export default {
  data() {
    return {
      showModal: false,
      selectedProduct: null,
      quantity: 1,
      purchaseSuccess: false,
      products: [
        {
          id: 1,
          name: "加禮宛木雕",
          artist: "卡兆・馬耀",
          image: "../src/assets/image/加禮宛 木雕 改過.png",
          description:
            "加禮宛木雕，達固湖灣被攻破後，二族慘遭滅族，倖存族人逃往縱谷、東海岸，隱身於阿美族之中，直至2007年才正名成功。2006年7月1日，撒奇萊雅族於花蓮市國福部落舉辦首次火神祭，喚醒逝去的靈魂其記取過去。",
          price: 80000,
        },
        {
          id: 2,
          name: "部落的土地",
          artist: "卡兆・馬耀",
          image: "../src/assets/image/房子阿美族.jpg",
          description:
            "原住民的活動範圍逐漸受限，生活方式也被迫變遷，造成文化的流失，土地的淵源就是人的淵源。光是地名用來辨識當地資源、地貌、地形，族人不失去方向，是祖先們生活時留下來的智慧結晶。",
          price: 60000,
        },
        {
          id: 3,
          name: "母親的祝福",
          artist: "黃聖安",
          image: "../src/assets/image/黃聖安01.JPG",
          description:
            "阿美族社會是一個典型的母系社會，INA (依娜) 是媽媽，也是太陽，太陽是阿美族的精神象徵。太陽的光是慈祥的，是母親的手，溫暖並守護著族人，母親的角色象徵著生命的延續和大地的豐饒。",
          price: 9000,
        },
        {
          id: 4,
          name: "漁筌工具",
          artist: "文健站長輩",
          image: "../src/assets/image/魚筌（阿美族）.png",
          description:
            "魚筌為漁撈用編容器的一種，用以從事捕魚活動，該件物品的製作材質為黃藤與竹，用絞織編法縛紮而成，做漏斗狀，功用在於使魚、蝦進入之後無法游出去而被捕獲。",
          price: 1200,
        },
        {
          id: 5,
          name: "竹鐘樂器",
          artist: "達魯·嘎照",
          image: "../src/assets/image/kakeng截圖.png",
          description:
            "竹鐘（Kakeng）是阿美族獨有的樂器之一。傳統阿美族女方取男方時，女方家族為了告知部落家族即將再多增加一位男丁，便以長竹筒管擊地作為報喜訊的方式，日治時期政府以「文明」為名，禁止阿美族招贅的風俗，進而使敲擊竹鐘的傳統消逝。",
          price: 5000,
        },
        {
          id: 6,
          name: "木鼓樂器",
          artist: "達魯·嘎照",
          image: "../src/assets/image/木鼓.JPG",
          description:
            "過去阿美族人的木鼓是取樟樹或茄苳樹等不易腐爛的樹種，將樹幹挖空成鼓胴，再用繩索懸掛於聚會所，要召集族人時，便用杵棒撞擊使之產生宏亮聲響。族人也會依集合或緊急的狀況，決定敲擊鼓聲的長短與多少為信號，這樣的方式有效地傳遞訊息。",
          price: 4000,
        },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.selectedProduct ? this.quantity * this.selectedProduct.price : 0;
    }
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
      this.quantity = 1;
      this.purchaseSuccess = false;
    },
    closeModal() {
      this.showModal = false;
    },
    confirmPurchase() {
      const cartStore = useCartStore(); // 使用購物車 store
      cartStore.addToCart({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        image: this.selectedProduct.image,
        quantity: this.quantity,
      });
      this.purchaseSuccess = true;
      setTimeout(() => {
        this.purchaseSuccess = false;
        this.showModal = false;
      }, 2000);
    }
  }
};
</script>


<style scoped>
 @import url(../assets//css/reset.css);

.wrap {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-image: url(../assets/image/背景背景.png);
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}

/* 漢堡 */
.navbar.hidden {
  display: none;
}

/* 漢堡選單 */
.hamburger {
  display: none;
  cursor: pointer;
  font-size: 28px;
}

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

.coursetext {
  display: flex;
  white-space: nowrap;
}

.coursetext p {
  font-size: 10px;
  padding-left: 55px;
  padding-top: 15px;
  text-align: center;
  letter-spacing: 1px;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.course {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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


/* cardrwd */
@media (max-width: 1042px) {
  .course {
    width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
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

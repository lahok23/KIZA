<template>
  <div class="wrap">
    <!-- Banner -->
    <div class="banner">
      <img src="../assets/image/工作坊封面.JPG" alt="工作坊封面" />
      <div class="text-banner">
        <h2>工作坊</h2>
        <h1>透過溫度，傳遞文化的力量</h1>
      </div>
    </div>

    <!-- 工作坊選擇區域 -->
    <section>
      <h2>選擇工作坊</h2>
      <ul class="course">
        <li
          class="card-item"
          v-for="(course, index) in courses"
          :key="index"
          :data-itemid="'uniqueItemId' + index"
        >
          <div class="card-image">
            <img :src="course.image" :alt="course.name" />
          </div>
          <ul>
            <div class="coursetext">
              <h3>{{ course.name }}</h3>
              <p>{{ course.instructor }}</p>
            </div>
            <p class="name">
              {{ course.pronunciation }}
              <span>
                <i
                  class="ph-bold ph-speaker-high"
                  @click="playAudio(course.audio, $event)"
                ></i>
              </span>
            </p>
            <span class="subtitle">{{ course.description }}</span>
            <li><a href="#">耗時</a><span>{{ course.duration }}</span></li>
            <li>
              <a href="#">金額</a>
              <span class="price" :data-price="course.price">{{ course.price }}元</span>
            </li>
            <button
              class="btn-filled-dark"
              @click="openReservationModal(course)"
            >
              預約
            </button>
          </ul>
        </li>
      </ul>
    </section>

    <!-- 預約彈窗 -->
    <div v-if="showModal" id="reservation-modal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <img src="../assets/image/橫式超超小.png" alt="logo" />
        <p>預約講師日期：</p>
        <input type="date" v-model="selectedDate" />
        <p>請選擇人數：</p>
        <input type="number" v-model="selectedPeople" min="1" />
        <p>總金額：{{ totalPrice }}元</p>
        <button class="btn-filled-dark" @click="confirmReservation">確認預約</button>
        <p v-if="successMessage" style="color: green">預約成功！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'; // 引入 Pinia store

export default {
  data() {
    return {
      isMenuHidden: window.innerWidth <= 1042,
      showModal: false,
      successMessage: false,
      selectedDate: "",
      selectedPeople: 1,
      globalCourse: null,
      courses: [
        {
          id: 1,
          name: "製作情人袋",
          instructor: "講師巴奈",
          pronunciation: "alubu",
          image: new URL('../assets/image/製作情人袋.jpg', import.meta.url).href,
          audio:new URL('@/assets/video/alubu.mov', import.meta.url).href,
          description:
            "豐年祭上，女孩可藉由舞蹈將檳榔放入心儀男孩的情人袋，若男孩也非常屬意女孩，則可將情人袋贈與給女孩配戴，宣告兩人的交往關係。",
          duration: "6.5h",
          price: 1200,
        },
        {
          id: 2,
          name: "認識野菜",
          instructor: "講師 笛布斯",
          pronunciation: "dateng",
          image:new URL('../assets/image/認識野菜.jpg', import.meta.url).href,
          audio: new URL('@/assets/video/dateng.mov', import.meta.url).href,
          description:
            "阿美族，又稱「吃草的民族」，居住地自然環境、資源豐厚，而發展出野菜文化。早年阿美族取得食物不易，便直接山林中取材，從野外少量採摘蔬菜。",
          duration: "3h",
          price: 200,
        },
        {
          id: 3,
          name: "樹皮文化",
          instructor: "講師 拉厚克",
          pronunciation: "tupelak",
          image: new URL('../assets/image/399694620_664327975847548_4643314732394794198_n.jpg', import.meta.url).href,
          audio: new URL('@/assets/video/tupelak.mov', import.meta.url).href,
          description:
            "大自然與原住民的生活息息相關，在三百多年前阿美族人就會用樹皮來做衣服，由於沒有留下文字資料，一切靠口傳，體驗樹皮文化的創作。",
          duration: "4h",
          price: 1000,
        },
        {
          id: 4,
          name: "藤編文化",
          instructor: "講師 拿告",
          pronunciation: "uway",
          image: "https://www.jacreative.com.tw/eastcwh/2019/images/fakong/s8.jpg",
          audio: new URL('@/assets/video/uway.mov', import.meta.url).href,
          description:
            "體驗藤編文化，在迷你的小背簍中看見部落的力與美！由可愛的藤編Ina教你製作背簍時，削成扁形的做成四周與底部的編織，削成圓形的作為提揹的支架。",
          duration: "3h",
          price: 500,
        },
        {
          id: 5,
          name: "樂舞體驗",
          instructor: "講師 阿勒飛斯",
          pronunciation: "misakeru",
          image: "https://www.hualiennews.com/wp-content/uploads/2021/05/46B03EBD-64F5-426F-B0CD-4D5201035994.jpg",
          audio: new URL('@/assets/video/misakeru.mov', import.meta.url).href,
          description:
            "『歌』，記憶以前的生活，『舞』，保存現在的傳統『樂舞展現的不僅是表演藝術，是藏在靈魂裡的語言，是傳遞文化的媒介。』",
          duration: "2h",
          price: 400,
        },
        {
          id: 6,
          name: "古謠傳唱",
          instructor: "講師 大亨",
          pronunciation: "remadiw",
          image: new URL('../assets/image/名人校園講唱會.jpg', import.meta.url).href,
          audio: new URL('@/assets/video//remadwi.mov', import.meta.url).href,
          description:
            "課程中學習一般歌謠，指平時所唱的歌謠，包括工作歌及生活歌。演唱方式除應答唱法外，大多是以齊唱的方式來進行。",
          duration: "3h",
          price: 600,
        },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.globalCourse ? this.globalCourse.price * this.selectedPeople : 0;
    },
  },
  methods: {
    // 音訊的處理
    playAudio(audioSrc, event) {
      const audio = new Audio(audioSrc);
      audio.play();
      const icon = event.currentTarget;
      icon.classList.add("clicked");
      audio.addEventListener("ended", () => {
        icon.classList.remove("clicked");
      });
    },
    openReservationModal(course) {
      this.globalCourse = course;
      this.showModal = true;
      this.selectedPeople = 1;
      this.selectedDate = "";
    },
    confirmReservation() {
      if (this.selectedDate && this.selectedPeople > 0) {
        const cartStore = useCartStore(); // 引入購物車 store
        cartStore.addToCart({
          id: Date.now().toString(),
          name: this.globalCourse.name,
          price: this.globalCourse.price,
          quantity: parseInt(this.selectedPeople),
          image: this.globalCourse.image,
          date: this.selectedDate,
        });

        // 使用 SweetAlert 顯示預約成功
        Swal.fire({
          title: '預約成功！',
          text: `您已成功預約 ${this.globalCourse.name}，總金額為 ${this.totalPrice} 元。`,
          icon: 'success',
          confirmButtonText: '完成',
          confirmButtonColor: "green",
        });

        this.showModal = false;
      } else {
        // 使用 SweetAlert 提示用戶選擇日期和人數
        Swal.fire({
          title: "未選擇預約",
          text: "請選擇一個日期以繼續預約。",
          icon: "error",
          confirmButtonColor: "red",
        });
      }
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
  background-image: url(../assets/image/背景背景.png);
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}




#workshop a {
  color: crimson;
  border-bottom: 4px solid crimson;
  padding-bottom: 16px;
}

.icon a:hover {
  color: crimson;
  border-bottom: 4px solid crimson;
  padding-bottom: 15px;
  transition: 1s;
}

.navbar li a:hover {
  color: crimson;
  border-bottom: 4px solid crimson;
  padding-bottom: 16px;
  transition: 1s;
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

/* banner */
.banner {
  position: relative;
}

.banner img {
  width: 100%;
  height: 75vh;
  opacity: 90%;
  object-fit: cover;
}

.text-banner {
  position: absolute;
  color: white;
  top: 45%;
  left: 5%;
  line-height: 50px;
}

.text-banner h2 {
  font-size: 30px;
}

.text-banner h1 {
  font-size: 42px;
  font-weight: bold;
}

/* css下 */

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

.coursetext {
  display: flex;
}

.coursetext p {
  font-size: 11px;
  padding-left: 55px;
  padding-top: 15px;
  text-align: center;
  letter-spacing: 1px;
  flex-wrap: nowrap;
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

.card-image {
  object-fit: cover;
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

.course {
 width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .course {
    width: 100%;
    flex-wrap: wrap;
  }
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

@media (max-width: 1042px) {
  .course {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-image {
    height: auto;
    object-fit: contain;
  }
}
/* 
預約視窗  */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

/* 預約視窗內容 */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  height: 55vh;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.close-btn {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-btn:hover,
.close-btn:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
}

.modal-content p {
  margin: 10px 0;
  color: #666;
}

.modal-content input[type="number"] {
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-content .btn-filled-dark {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 35%;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.modal-content .btn-filled-dark:hover {
  background-color: crimson;
}

.clicked {
  color:crimson;
}


/* cardrwd */
@media (max-width: 430px) {
  section{
    padding: 2rem 2.2rem 2rem 2.2rem;
    transform: translate(-4.5%,0%);
  }
  /* 調整圖像寬度 */
  .card-item{
    width: 50%;
    
  }
 
  .course {
    margin: 0 auto;
    width: 280%;
    padding-right:20rem;
   
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
  }
  .course li{
    width: 60%;
  }

  .card-image{
    width: 130%;
  } 
  .card-image > img{
    width: 100%;
  }
  .coursetext{
    width: 1px;
  }
  .card-item > ul{
  padding: 15px;
  line-height: 1.2;
  }
  .course ul h3{
    font-size: 1.3rem;
    white-space: nowrap;
    margin-bottom:2rem;
  }
  .course ul p{
    margin-top: 0rem;
    font-size: 0.6rem;
  }
  .course .name{
    font-size: 1.3rem;
    margin-top: -35px;
  }
  .coursetext p{
    white-space: nowrap;
    transform: translate(-35%,-10%);
  }
  

  /* 金額 */
  .card-item .subtitle{
    font-size: 0.7rem;
    margin-top: 0px;
  
    width: 25ch;
  
  }
  .price{
    white-space: nowrap;
    padding: px;
  }
  .card-item > ul > li a{
    line-height: 10px;
  }

  .banner img {
   height: 50vh;
  }
  .text-banner h2 {
    font-size: 1.7rem;
    font-weight: bold;
  }
  .text-banner h1 {
    font-size: 1.7rem;
  }
  
}
  </style>
  
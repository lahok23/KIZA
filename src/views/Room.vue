<template>
  <div class="wrap">
    <!-- 搜尋區域 -->
    <section class="form-container">
      <h2>您想去哪裡?</h2>
      <div class="input-container">
        <!-- 目的地選擇框 -->
        <div class="inputBox" @click="showPopup('destination')">
          <i class="ph-fill ph-map-pin"></i>
          <input type="text" placeholder="選擇奇萊地點" v-model="destinationInput" readonly />
        </div>
        <!-- 日期選擇框 -->
        <div class="inputBox" @click="showPopup('date')">
          <i class="ph-fill ph-calendar-check"></i>
          <input type="text" placeholder="選擇日期" v-model="dateInput" readonly />
        </div>
        <!-- 旅客人數選擇框 -->
        <div class="inputBox" @click="showPopup('guests')">
          <i class="ph-fill ph-user"></i>
          <input type="text" placeholder="2 位旅客, 1 間客房" v-model="guestsInput" readonly />
        </div>
      </div>
      <div class="inputBox">
        <input type="submit" value="搜尋" @click="searchRooms" />
      </div>
    </section>

    <!-- 房間展示區域 -->
    <section class="room">
      <h2>選擇奇萊房間</h2>
      <p>土地即是文化的道路</p>
      <div class="room-container">
        <div v-for="(room, index) in visibleRooms" :key="index" class="room-item" :data-location="room.location">
          <a href="#" @click.prevent="openBookingPopup(room)">
            <img :src="room.image" :alt="room.name" @load="onImageLoad" @error="onImageError" />
          </a>
          <p>{{ room.rating }}/10 <span>{{ room.reviews }}</span></p>
          <h3>{{ room.name }}</h3>
          <p>{{ room.location }}</p>
          <div class="room-item-btn">
            <h3 class="price">NT${{ room.price }}</h3>
            <a href="#" class="btn-filled-dark" @click.prevent="openBookingPopup(room)">
              <h4>加入購物車</h4>
            </a>
          </div>
        </div>
      </div>
      <!-- 滾動箭頭 -->
      <button class="arrow arrow-left" @click="scrollLeft">&#8249;</button>
      <button class="arrow arrow-right" @click="scrollRight">&#8250;</button>
    </section>
       <!-- 探索更多活動 -->
      <section class="work">
        <h2>探索更多活動</h2>
        <p>延續文化的溫度</p>
        <div class="work-container">
          <div class="work-item">
           <router-link to="/festival">
              <img src="../assets/image/撒奇萊雅祭典.webp" alt="kiza" />
            </router-link>
            <h3>祭典</h3>
          </div>
          <div class="work-item">
            <router-link to="meals">
              <img src="../assets/image/阿里鳳鳳.jpg" alt="food" />
            </router-link>
            <h3>飲食</h3>
          </div>
          <div class="work-item">
            <router-link to="art">
              <img src="../assets/image/黃聖安01.JPG" alt="tony" />
            </router-link>
            <h3>藝術</h3>
          </div>
          <div class="work-item">
            <router-link to="workshop">
              <img src="../assets/image/399694620_664327975847548_4643314732394794198_n.jpg" alt="work" />
            </router-link>
            <h3>工作坊</h3>
          </div>
        </div>
      </section>
    <!-- 加入購物車彈出視窗 -->
    <div v-if="showBookingPopupFlag" class="popup">
      <div class="popup-content">
        <img src="../assets/image/logo橫式.png" alt="logo" />
        <span class="close-btn" @click="closePopup('booking')">&times;</span>
        <h3>{{ bookingInfo.name }}</h3>
        <label>入住日期</label>
        <input type="date" v-model="bookingStartDate" />
        <label>退房日期</label>
        <input type="date" v-model="bookingEndDate" />
        <label>成人</label>
        <input type="number" v-model="bookingAdults" min="1" />
        <label>兒童</label>
        <input type="number" v-model="bookingChildren" min="0" />
        <button @click="confirmBooking">加入購物車</button>
      </div>
    </div>

    <!-- 加入購物車成功彈出視窗 -->
    <div v-if="showSuccessPopupFlag" class="popup">
      <div class="popup-content">
        <img src="../assets/image/logo橫式.png" alt="logo" />
        <span class="close-btn" @click="hidePopup('success')">&times;</span>
        <h3>已加入購物車</h3>
        <button @click="hidePopup('success')">完成</button>
      </div>
    </div>

    <!-- 目的地、日期、旅客數量彈出視窗 -->
    <PopupSelect
      v-if="popupType === 'destination'"
      @close="closePopup('destination')"
      @save="saveDestination"
      :options="['花蓮市', '吉安鄉', '新城鄉']"
      title="選擇地點"
    />
    <PopupSelect
      v-if="popupType === 'date'"
      :key="popupType"
      @close="closePopup('date')"
      @save="saveDate"
      :startDate="bookingStartDate"
      :endDate="bookingEndDate"
      title="選擇日期"
    />
    <PopupSelect
      v-if="popupType === 'guests'"
      @close="closePopup('guests')"
      @save="saveGuests"
      :adults="bookingAdults"
      :children="bookingChildren"
      title="選擇旅客"
    />
  </div>
</template>

<script>
import PopupSelect from '@/components/PopupSelect.vue';
import { useCartStore } from '@/stores/cartStore'; // 引入購物車的 store


export default {
  components: {
    PopupSelect,
  },
  setup() {
    const cartStore = useCartStore(); // 初始化購物車 store

    return {
      cartStore, // 返回購物車 store 供組件使用
    };
  },
  data() {
    return {
      currentStartIndex: 0,
      roomsPerPage: 4,
      showBookingPopupFlag: false,
      showSuccessPopupFlag: false,
      popupType: '',
      destinationInput: '',
      filteredRooms: [],
      dateInput: '',
      guestsInput: '2 位旅客, 1 間客房',
      bookingInfo: {},
      bookingStartDate: '',
      bookingEndDate: '',
      bookingAdults: 1,
      bookingChildren: 0,
      rooms: [
  {
    name: '北星海景套房',
    location: '新城鄉',
    price: 1130,
    image: new URL('../assets/image/七星潭有海的照片2.jpg', import.meta.url).href,
    rating: 9.4,
    reviews: '棒極了(1002則評論)',
  },
  {
    name: '撒固兒套房',
    location: '花蓮市',
    price: 1390,
    image: new URL('../assets/image/sakul.jpg', import.meta.url).href,
    rating: 9.5,
    reviews: '大拇指(693則評論)',
  },
  {
    name: '娜荳蘭套房',
    location: '吉安鄉',
    price: 1230,
    image: new URL('../assets/image/吉寶竿.jpg', import.meta.url).href,
    rating: 9.9,
    reviews: '棒極了(1832則評論)',
  },
  {
    name: '磯固套房',
    location: '花蓮市',
    price: 1192,
    image: new URL('../assets/image/ciku.jpg', import.meta.url).href,
    rating: 9.7,
    reviews: '最美的(379則評論)',
  },
  {
    name: '洄瀾套房',
    location: '新城鄉',
    price: 990,
    image: new URL('../assets/image/洄瀾回欄.jpg', import.meta.url).href,
    rating: 9.1,
    reviews: '棒極了(102則評論)',
  },
  {
    name: '幕夏民宿',
    location: '吉安鄉',
    price: 1290,
    image: new URL('../assets/image/目下.jpg', import.meta.url).href,
    rating: 9.5,
    reviews: '美呆了(1209則評論)',
  },
  {
    name: '海軒民宿',
    location: '花蓮市',
    price: 1090,
    image: new URL('../assets/image/海景軒 花蓮市.jpg', import.meta.url).href,
    rating: 9.4,
    reviews: '棒極了(2002則評論)',
  },
  {
    name: '吉寶竿民宿',
    location: '花蓮市',
    price: 1190,
    image: new URL('../assets/image/寶竿套房.jpg', import.meta.url).href,
    rating: 9.5,
    reviews: '大拇指(622則評論)',
  },
  {
    name: '圖雅民宿',
    location: '新城鄉',
    price: 3820,
    image: new URL('../assets/image/圖雅特海.jpg', import.meta.url).href,
    rating: 9.9,
    reviews: '美的國度(2622則評論)',
  },
  {
    name: '奇文套房',
    location: '吉安鄉',
    price: 2110,
    image: new URL('../assets/image/奇文套房.jpg', import.meta.url).href,
    rating: 9.5,
    reviews: '大拇指(122則評論)',
  },
  {
    name: '曠野民宿',
    location: '吉安鄉',
    price: 890,
    image: new URL('../assets/image/曠野民宿.jpg', import.meta.url).href,
    rating: 9.3,
    reviews: '大拇指(59則評論)',
  },
  {
    name: 'Cika民宿',
    location: '新城鄉',
    price: 990,
    image: new URL('../assets/image/cika民宿.jpg', import.meta.url).href,
    rating: 9.5,
    reviews: '棒極了(322則評論)',
  }
],
    };
  },
  computed: {
    visibleRooms() {
      return this.filteredRooms.slice(this.currentStartIndex, this.currentStartIndex + this.roomsPerPage);
    },
    filteredRooms() {
      const filtered = this.destinationInput
        ? this.rooms.filter(room => room.location === this.destinationInput)
        : this.rooms;
      return filtered;
    },
  },
  methods: {
    searchRooms() {
      const filteredRooms = this.rooms.filter(room => {
        const matchesDestination = this.destinationInput ? room.location === this.destinationInput : true;
        const matchesDate = this.bookingStartDate && this.bookingEndDate ? this.checkAvailability(room) : true;
        const matchesGuests = this.guestsInput ? this.checkGuests(room) : true;
        return matchesDestination && matchesDate && matchesGuests;
      });
      this.filteredRooms = filteredRooms;
    },
    showPopup(type) {
      this.popupType = type;
    },
    closePopup(type) {
      this.popupType = '';
    },
    saveDestination(value) {
      this.destinationInput = value;
      this.closePopup('destination');
    },
    saveDate(value) {
      this.bookingStartDate = value.startDate;
      this.bookingEndDate = value.endDate;
      this.dateInput = `${value.startDate} 至 ${value.endDate}`;
      this.closePopup('date');
    },
    saveGuests(value) {
      this.guestsInput = `${value.adults} 位旅客, ${value.children} 位兒童`;
      this.closePopup('guests');
    },
    scrollLeft() {
      if (this.currentStartIndex > 0) {
        this.currentStartIndex -= this.roomsPerPage;
      }
    },
    scrollRight() {
      if (this.currentStartIndex + this.roomsPerPage < this.rooms.length) {
        this.currentStartIndex += this.roomsPerPage;
      }
    },
    openBookingPopup(room) {
      this.bookingInfo = room;
      this.showBookingPopupFlag = true;
    },
    confirmBooking() {
      // 確認加入購物車
      if (!this.bookingStartDate || !this.bookingEndDate || this.bookingAdults === "") {
        Swal.fire({
          title: '錯誤',
          text: '請選擇所有必要的資料，包括入住日期、退房日期和成人數量。',
          icon: 'error',
          confirmButtonText: '確認',
          confirmButtonColor: "red",
        });
        return;
      }

      // 把房間加入購物車
      const roomItem = {
        ...this.bookingInfo,
        startDate: this.bookingStartDate,
        endDate: this.bookingEndDate,
        adults: this.bookingAdults,
        children: this.bookingChildren,
      };
      this.cartStore.addToCart(roomItem); // 將房間加入購物車

      Swal.fire({
        title: '加入購物車成功',
        html: `已將 ${this.bookingInfo.name} 加入購物車。`,
        icon: 'success',
        confirmButtonText: '完成',
        confirmButtonColor: "green",
      }).then(() => {
        this.showBookingPopupFlag = false;
        this.showSuccessPopupFlag = false;
      });
    },
  },
  mounted() {
    this.filteredRooms = this.rooms;
  },
};
</script>



<style scoped>
@import url(https://fonts.googleapis.com/css?family=Amatic+SC:400,700);
@import url(../assets/css/reset.css);

.wrap {
  width: 1440px;
  margin: 0 auto;
  background-image: url(../assets/image/背景背景.png);
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}
/* ---- */
.form-container {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 50px auto;
  margin-top: 200px;
}

.form-container h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.inputBox {
  flex: 1;
  margin: 10px;
  position: relative;
}

.inputBox i {
  font-size: 24px;
  color: #555;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}
.discount-item {
  display: flex;
  gap: 50px;
}

.inputBox input[type="text"],
.inputBox input[type="date"] {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.inputBox input[type="text"]:focus,
.inputBox input[type="date"]:focus {
  border-color: crimson;
}

.inputBox input[type="submit"] {
  background-color: rgb(143, 84, 63);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.inputBox input[type="submit"]:hover {
  background-color: crimson;
}

@media (max-width: 1042px) {
  .form-container {
    width: 70%;
  }
}

/* 現有CSS省略 */

.popup {
  display: flex;  /* 確保彈出視窗顯示 */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  border-radius: 10px;
  position: relative;
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

.popup-content h3 {
  margin-top: 0;
}

.popup-content label {
  display: block;
  margin: 10px 0 5px;
}

.popup-content input[type="number"],
.popup-content input[type="text"],
.popup-content input[type="date"],
.popup-content select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.popup-content button {
  background-color: crimson;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
}

.popup-content button:hover {
  background-color: rgb(169, 37, 37);
}

/* 下方折扣碼 */
.discount {
  display: flex;
  background-color: rgb(143, 84, 63);
  color: white;
  margin-left: 100px;
  margin-right: 100px;
  border-radius: 30px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
}

.discount h2 {
  font-size: 32px;
}

.item h4 {
  background-color: rgba(35, 34, 34, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  font-size: 22px;
}

.item i {
  font-size: 42px;
  letter-spacing: 20px;
}

@media (max-width: 1042px) {
  .item-h2 h2 {
    font-size: 1.9rem;
    padding-right: 20px;
  }

  .discount-item {
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
}

/* 選擇奇來房間文字往外推 */

.room {
  margin-top: 50px;
  padding: 20px 50px;
}

.room h2 {
  padding-left: 50px;
  line-height: 40px;
}

.room h2 {
  font-size: 42px;
  font-weight: 450;
}

.work p {
  font-size: 16px;
  color: gray;
}

/* 房間容器 */
.room-container {
  width: 100%;
  gap: 40px;
  padding: 20px 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: hidden;
  scroll-behavior: smooth;
}

.room-item {
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 3px 3px rgb(193, 193, 193);
  border-radius: 20px;
}

.room-item h3 {
  padding: 5px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bolder;
  padding-left: 15px;
  color: rgb(0, 0, 0);
}

.room-item p {
  font-size: 16px;
  padding-left: 15px;
  line-height: 40px;
  /* span {
    color: grey;
  } */
}

.room-item p:nth-of-type(2) {
  color: rgb(99, 99, 99);
}

.room-item h3:nth-of-type(2) {
  font-size: 28px;
  padding-top: 20px;
}
.room-item h5 {
  font-size: 14px;
  line-height: 18px;
  color: gray;
  padding-left: 15px;
}
/* 這邊是價錢跟按鈕的容器 */
.room-item-btn {
  margin-top: 20px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-item-btn h3 {
  font-size: 1.6rem;
}
.room-container h4 {
  float: right;
  font-size: 1rem;
  margin-right: 20px;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  background-color: crimson;
}

.room-container h4:hover {
  background-color: rgb(143, 84, 63);
  transition: 1s;
}
.room-item h3 {
  line-height: 1px;
}

.room-item img {
  border-radius: 15px;
  height: 29vh;
  object-fit: cover;
  object-position: center;
}

.room-item:hover {
  transform: scale(1.05, 1.05);
  transition: 1s;
}

/* 房間rwd
@media (max-width: 1042px) {
  .room {
    width: 100%;
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
  }

  .room-item {
    h3:nth-of-type(2) {
      font-size: 20px;
    }
    h5 {
      font-size: 10px;
    }
    h4 {
      font-size: 10px;
    }
  }
} */

.arrow {
  cursor: pointer;
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 50px;
  z-index: 10;
}

.arrow:hover {
  background-color: black;
  color: white;
  transition: 1s;
}

.arrow-left {
  left: 4%;
}

.arrow-right {
  right: 4%;
}

.room {
  position: relative;
}

/* 工作坊 */
.work-container{
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px 40px;
}

.work {
  padding: 20px 50px;
  margin-bottom: 100px;
}

.work h2,
p {
  padding-left: 50px;
  line-height: 40px;
}

.work h2 {
  font-size: 42px;
  font-weight: 450;
}


.work-item {
  max-width: 22.5%;
  position: relative;
}

.work-item h3 {
  position: absolute;
  top: 83%;
  left: 3%;
  padding: 5px;
  font-size: 22px;
  font-weight: 400;
  color: white;
}

.work-item img {
  border-radius: 10px;
  filter: brightness(60%);
  height: 30vh;
  object-fit: cover;
  object-position: center;
  filter: brightness(60%);
}

.work-item:hover {
  transform: scale(1.1, 1.1);
  transition: 1s;
}

/* 新增的 */
.popup {

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}


/* 訂房的彈掉視窗 */
.popup-content {
  width: 30%;
}
.popup-content img {
  width: 50%;
}

.popup-content h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}

/* 彈跳成功的 */
#success-popup h3 {
  font-size: 14px;
  color: rgb(19, 150, 19);
}

/* sweetalert調整icon位置 */
.my-swal-popup {
  margin: 0 auto; /* 居中顯示 */
  padding: 1.5rem; /* 根據需要調整內邊距 */
  box-sizing: border-box; /* 確保 padding 不會影響大小 */
}

</style>

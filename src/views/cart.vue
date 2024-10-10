<template>
    <div class="wrap cf">
      <div class="heading cf">
        <h1>我的購物車</h1>
        <router-link to="/meals" class="continue">繼續購物</router-link>
      </div>
  
      <div class="cart">
        <ul class="cartWrap">
          <li v-for="(item, index) in cartItems" :key="index" class="items" :class="index % 2 === 0 ? 'even' : 'odd'">
            <div class="infoWrap">
              <div class="cartSection">
                <img :src="item.image" :alt="item.name" class="itemImg" />
                <p class="itemNumber"></p>
                <h3>{{ item.name }}</h3>
                <span>數量</span>
                
                <!-- 加入 @change 事件來觸發更新數量 -->
                <input type="text" class="qty" v-model="item.quantity" @change="updateQuantity(index, item.quantity)" />
                <!-- <p v-if="item.date" class="reservationDate">預約日期: {{ item.date }}</p> -->
              </div>
              <div class="prodTotal cartSection">
                <p>$ {{ Number.isInteger(item.price * item.quantity) ? (item.price * item.quantity) : (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              <div class="cartSection removeWrap">
                <a href="#" @click.prevent="removeFromCart(index)"><i class="ph ph-trash-simple delete"></i></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
  
      <div class="subtotal cf">
        <ul>
          <li class="totalRow">
            <span class="label">小計</span>
            <span class="value">$ {{ Number.isInteger(subtotal) ? subtotal : subtotal.toFixed(2) }}</span>
          </li>
          <li class="totalRow">
            <span class="label">運費</span>
            <span class="value">$5</span>
          </li>
          <li class="totalRow final">
            <span class="label">總計</span>
            <span class="value">$ {{ Number.isInteger(total) ? total : total.toFixed(2) }}</span>
          </li>
        </ul>
      </div>
  
      <div class="checkout-form">
        <h2>結帳資訊</h2>
        <form @submit.prevent="checkout">
          <label for="name">姓名:</label>
          <input type="text" v-model="checkoutForm.name" required />
  
          <label for="phone">電話:</label>
          <input type="text" v-model="checkoutForm.phone" required />
  
          <label for="address">住址:</label>
          <input type="text" v-model="checkoutForm.address" required />
  
          <label for="creditCard">信用卡號:</label>
          <input type="text" v-model="checkoutForm.creditCard" required />
  
          <button type="submit" class="btn continue">結帳</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  // 使用 Pinia 的購物車 store
  import { useCartStore } from "@/stores/cartStore"; 
  
  export default {
    setup() {
      const cartStore = useCartStore(); // 引入購物車 store
  
      const checkoutForm = {
        name: "王東尼",
        phone: "0912345678",
        address: "花蓮縣富里鄉袋米路2號",
        creditCard: "4242-4242-4242-4242",
      };
  
      const removeFromCart = (index) => {
        cartStore.removeFromCart(index); // 更新為正確的 Pinia action 名稱
      };
  
      const updateQuantity = (index, quantity) => {
        cartStore.updateQuantity(index, quantity); // 當數量變動時更新購物車
      };
  
      const checkout = () => {
      if (cartStore.cartItems.length === 0) {
    // 顯示 SweetAlert 提示購物車為空
    Swal.fire({
      title: '購物車為空',
      text: '請選擇商品後再結帳！',
      icon: 'warning',
      confirmButtonText: '確認',
      confirmButtonColor: 'crimson'
    });
    return;
      } 

      // 顯示 SweetAlert 訂單成功訊息
      Swal.fire({
      title: '感謝您的訂購！',
      text: '我們已收到您的訂單，會儘快處理。',
      icon: 'success',
      confirmButtonText: '確認',
      confirmButtonColor: 'green'
      }).then(() => {
     // 清空購物車並刷新頁面
      cartStore.clearCart();
      window.location.reload(); // 刷新頁面
    });
};
  
      return {
        cartItems: cartStore.cartItems,
        subtotal: cartStore.subtotal,
        total: cartStore.total,
        checkoutForm,
        removeFromCart,
        updateQuantity, // 將更新數量的函數綁定
        checkout,
      };
    },
  };
  </script>
  
  <style scoped>
  @import url(../assets/css/reset.css);
  @import url(../assets/css/cart.css);
  </style>
  
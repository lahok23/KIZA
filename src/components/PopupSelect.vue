<template>
  <div class="popup">
    <div class="popup-content">
      <span class="close-btn" @click="$emit('close')">&times;</span>
      <h3 class="popup-text">{{ title }}</h3>
<!-- 地點選擇 -->
<div v-if="options && title === '選擇地點'">
  <div  class="whereText"   :class="{ 'checked': selectedOption === option }"  v-for="option in options" :key="option" @click="selectOption(option)">
    {{ option }}
  </div>
</div>

<!-- 日期選擇 -->
<div v-if="startDate  || title === '選擇日期'">
 <div class="date-input-container">
  <label>開始日期</label>
  <input type="date" v-model="localStartDate" />
</div>
  <br>
  <div class="date-input-container">
  <label>結束日期</label>
  <input type="date" v-model="localEndDate" />
</div>
</div>

<!-- 旅客選擇 -->
<div v-if="adults !== undefined && children !== undefined && title === '選擇旅客'">
  <div class="date-input-container">
  <label>成人</label>
  <input type="number" v-model="localAdults" min="1" />
</div>
  <br>
  <label>兒童</label>
  <input type="number" v-model="localChildren" min="0" />
</div>


      <button @click="saveSelection">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    options: Array, // 地點選擇
    startDate: String, // 日期選擇
    endDate: String, // 日期選擇
    adults: Number, // 成人數選擇
    children: Number, // 兒童數選擇
  },
  data() {
    return {
      selectedOption: this.options ? this.options[0] : null, // 預設
      localStartDate: this.startDate || '', // 本地日期選擇
      localEndDate: this.endDate || '', // 本地日期選擇
      localAdults: this.adults || 1, // 本地成人數選擇
      localChildren: this.children || 0, // 本地兒童數選擇
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    saveSelection() {
      if (this.options) {
        this.$emit('save', this.selectedOption); // 如果是選擇地點，返回選擇的結果
      } else {
        this.$emit('save', {
          startDate: this.localStartDate,
          endDate: this.localEndDate,
          adults: this.localAdults,
          children: this.localChildren,
        }); // 返回日期人數選擇結果
      }
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

.popup-text{
  font-size: 2rem;
  font-weight: bold;
}
.whereText{
  font-size: 1.2rem;
  font-weight: 400;
  border: 1px solid rgb(138, 31, 31);
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
}
.whereText:hover{
 background-color: crimson;
 color:white;
 transition: 1s;
 cursor: pointer;
}
/* 選中會被套上樣式*/
.checked {
  background-color: crimson; /* 當選中時的樣式 */
  color: white;
}

.date-input-container:nth-child(1){
  padding-top: 20px;
}
label{
  font-size: 1.2rem;
  padding-right:15px;
 
}
</style>

<template>
    <div class="footer">
        <router-link to="/homepage">
        <img src="@/assets/image/白色footer.png" alt="footerLogo" />
        </router-link>
        <ul class="footer-icon">
        <li><a href="#"><i class="ph-fill ph-instagram-logo"></i></a></li>
        <li><a href="#"><i class="ph-fill ph-facebook-logo"></i></a></li>
        <li><a href="#"><i class="ph-fill ph-twitter-logo"></i></a></li>
        </ul>
    </div>
</template>


<style>
@import url(../assets//css/reset.css);
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 80px;
  background-color: rgb(88, 88, 88);
  margin: 0 auto;
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
}</style>
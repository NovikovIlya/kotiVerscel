<script setup lang="ts">
import { computed, ref } from 'vue';

//data
const cartItems = ref(JSON.parse(localStorage.getItem('persons')) || []);

//functions
const deleteFavoriteCat = (person) => {
  const prev = JSON.parse(localStorage.getItem('persons')) || [];
  const newPrew = prev.filter((item) => item.id !== person.id);
  localStorage.setItem('persons', JSON.stringify(newPrew));

  cartItems.value = JSON.parse(localStorage.getItem('persons')) || [];
};
</script>

<template>
  <div v-if="cartItems" class="ww">
    <ul class="infinite-list" infinite-scroll-immediate="false">
      <TransitionGroup name="fade">
        <li v-for="person of cartItems" :key="person.id" class="infinite-list-item">
          <div @click="deleteFavoriteCat(person)" class="cat">
            <img
              class="catHover"
              :src="
                person.url
                  ? person.url
                  : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
              " />
            <img
              :class="{ hiddenWatch: false }"
              class="heart fullheart"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/45cce83542570fa99a82a171165d936e831b1ca10784f6b2df86696116852751?" />
          </div>
        </li>
      </TransitionGroup>
    </ul>
  </div>
  <TransitionGroup name="fade1">
    <div v-if="cartItems.length === 0">
      <el-empty description="Нет добавленных в 'Любимое' котиков ;c" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: opacity 5.5s ease;
}

.fade1-enter-from,
.fade1-leave-to {
  opacity: 0;
}
.zaga {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.25px;
}

.watch {
  visibility: visible;
}
.cat {
  position: relative;
  height: 225px;
  transition: 1s;
}
.cat:hover {
  box-shadow: rgba(0, 0, 0, 0.65) 0px 5px 15px;
  scale: 1.1;
  transition: 1s;
}
/* .catHover:hover{
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  scale: 1.1;
  transition: 1s
} */
.infinite-list-item {
  width: 225px;
  height: 225px;
}
.cat:hover {
  box-shadow: rgba(0, 0, 0, 0.65) 0px 5px 15px;
  scale: 1.1;
  transition: 1s;
}
.catHover {
  width: 225px;
  height: 225px;
  cursor: pointer;
  transition: 1s;
}

.heart {
  position: absolute;
  bottom: 19px;
  right: 15px;
  z-index: 1000;
  opacity: 0;
}
.fullheart {
  position: absolute;
  bottom: 19px;
  right: 15px;
  z-index: 1000;
  visibility: visible;
}
.hiddenWatch {
  visibility: visible !important;
}

.cat:hover .heart {
  opacity: 1;
}
.heart:hover {
  cursor: pointer;
  transition: 1s;
  background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/45cce83542570fa99a82a171165d936e831b1ca10784f6b2df86696116852751?');
}
.ww {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-wrap: wrap;
  padding-bottom: 100px;
}
.infinite-list {
  height: 99%;
  padding-left: 3%;
  padding-right: 3%;
  list-style: none;
  width: 90%;
  padding: 0;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  margin-bottom: 48px;
  border-radius: 20px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.infinite-list {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}

.err {
  display: flex;
  justify-content: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width: 600px) {
  .infinite-list {
    grid-template-columns: 100%;
  }
  .infinite-list-item {
    width: 100%;
  }
  .err {
    margin-top: 10px;
  }
}
</style>

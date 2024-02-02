<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useMovieStore } from '../store/index';
import { Data } from '../types';
import { ElMessage } from 'element-plus';

// data
const movieStore = useMovieStore();
const cartItems = ref(JSON.parse(localStorage.getItem('persons')) || []);
const localLoad = ref(false);
const num = ref(0);

// functions
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};

const addFavortieCat = (person: Data) => {
  if (idArray.value.includes(person.id)) {
    deleteFavoriteCat(person);
    return;
  }
  open2();
  const prev = JSON.parse(localStorage.getItem('persons')) || [];
  prev.push(person);
  localStorage.setItem('persons', JSON.stringify(prev));
  cartItems.value = JSON.parse(localStorage.getItem('persons')) || [];
};
const deleteFavoriteCat = (person: Data) => {
  open1();
  const prev = JSON.parse(localStorage.getItem('persons')) || [];
  const newPrew = prev.filter((item) => item.id !== person.id);
  localStorage.setItem('persons', JSON.stringify(newPrew));

  cartItems.value = JSON.parse(localStorage.getItem('persons')) || [];
};
const load = () => {
  num.value++;
  if (num.value === 15) {
    movieStore.setLocalad();
    // localLoad.value = true;
  }
};
const open1 = () => {
  ElMessage('Котик был удален из "Любимых".');
};
const open2 = () => {
  ElMessage({
    message: 'Котик добавлен в "Любимые"!',
    type: 'success',
  });
};
const open4 = () => {
  ElMessage({
    showClose: true,
    message: 'Произошла ошибка, попробуйте позднее.',
    type: 'error',
  })
}

/// computed
const idArray = computed(() => {
  const newArray = cartItems.value.map((item) => {
    return item.id;
  });
  return newArray;
});

// Lifecycle hooks
onMounted(() => {
  if (movieStore.data.length === 0) {
    movieStore.load();
  }
});

//wathers
watchEffect(()=>{
  if(movieStore.isError){
    open4()
  }
})
</script>

<template>
  <div class="ww" style="width: 100%">
    <ul
      v-show="movieStore.localLoad"
      v-infinite-scroll="movieStore.load"
      class="infinite-list"
      infinite-scroll-immediate="false">
      <TransitionGroup name="fade">
        <li v-for="(person, index) in movieStore.data" :key="person.id" class="infinite-list-item">
          <div class="cat">
            <img
              :onload="load"
              @error="imageLoadOnError"
              class="catHover"
              :src="
                person.url
                  ? person.url
                  : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
              " />
            <img
              @click="addFavortieCat(person)"
              class="heart"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6150d99cc284d656b809a6f15e5bc9d6f0da1a4be517e7466a0dad9525bac06" />
            <img
              @click="addFavortieCat(person)"
              :class="{ hiddenWatch: idArray.includes(person.id) }"
              class="fullheart"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/45cce83542570fa99a82a171165d936e831b1ca10784f6b2df86696116852751?" />
          </div>
        </li>
      </TransitionGroup>
    </ul>
    <div class="zaga" v-if="movieStore.isLoading || !movieStore.localLoad">
      ...загружаем {{ movieStore.page === 1 ? null : 'еще' }} котиков...
      <el-progress v-show="num < 15" class="progress" :percentage="num * 7" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  width: 20%;
  margin: 0 auto;
  margin-top: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.zaga {
  z-index: 0;
  margin-top: 15px;
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
.catHover:hover {
  // box-shadow: rgba(0, 0, 0, 0.65) 0px 5px 15px;
  // scale: 1.1;
  // transition: 1s;
}
.infinite-list-item {
  width: 225px;
  height: 225px;
}
.catHover {
  width: 225px;
  height: 225px;

  transition: 1s;
}

.heart {
  position: absolute;
  bottom: 19px;
  right: 15px;
  z-index: 0;
  opacity: 0;
}
.heart:hover {
  cursor: pointer;
  transition: 1s;
  background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/45cce83542570fa99a82a171165d936e831b1ca10784f6b2df86696116852751?');
}
.fullheart {
  position: absolute;
  bottom: 19px;
  right: 15px;
  z-index: 1000;
  visibility: hidden;
  cursor: pointer;
}
.heart:active {
  transform: scale(3);
}
.fullheart:active {
  transform: scale(1.2);
}

.hiddenWatch {
  visibility: visible !important;
}

.cat:hover .heart {
  opacity: 1;
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
  .containerNav {
    width: 100%;
  }
  .err {
    margin-top: 10px;
  }
  .progress {
    width: 40%;
  }
}
</style>

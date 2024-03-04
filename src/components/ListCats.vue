<script setup lang="ts">
import { Data } from '../types';

defineProps<{
  person: Data;
  idArray?: number[];
  load?: () => void;
  imageLoadOnError?: () => void;
  addFavortieCat?: (person: Data) => void;
}>();
</script>

<template>
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
      @click="$emit('addFavortieCat', person)"
      class="heart img1"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6150d99cc284d656b809a6f15e5bc9d6f0da1a4be517e7466a0dad9525bac06" />
    <img
      @click="$emit('addFavortieCat', person)"
      :class="{ hiddenWatch: idArray?.includes?.(person.id) }"
      class="fullheart img2"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/57f8f8416d56f1fb4d21a351e293adfb8d589088f5464e5fee630fddbc7a9531?apiKey=aa18c0d3b3a34c28b7c8cdbd1f49d1ae&" />
  </div>
</template>

<style scoped lang="scss">
.img1 {
  fill: #f24e1e;
}
.img2 {
  fill: #ff3a00;
}
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
  background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/45cce83542570fa99a82a171165d936e831b1ca10784f6b2df86696116852751?apiKey=aa18c0d3b3a34c28b7c8cdbd1f49d1ae&');
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
  fill: #ff0606;
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
  width: 1200px;
  gap: 4px;
  padding: 0;
}
.containerNav {
  width: 1200px;
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

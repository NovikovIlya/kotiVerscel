import { defineStore } from 'pinia';
import { ref } from 'vue';
import cachedAxios from '../axios.js';
import { Data } from '../types/index.js';


export const useMovieStore = defineStore('movieStore', () => {
  //data
  const data = ref<Data[]>([])
  const isLoading = ref(false);
  const isError = ref(false);
  const page = ref(0);

  //functions
  const load = () => {
    if (page.value === 1000) {
      alert('Последний страница');
      return;
    }
    page.value++;
    getCats(page);
  };
  const getCats = async (page) => {
    try {
      isError.value = false;
      isLoading.value = true;
      const res = await cachedAxios.get(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${page.value}`,
        {
          headers: {
            'x-api-key': 'live_CcWRuj2DUaa6ga7yc4ES8AzrKPNfrIKIqR4wLxCvlaUDuaDk1SZMi9sXsB24zrPJ',
          },
        },
      );
  
      const dataZ = res.data;
      data.value = [...data.value, ...dataZ];
      isError.value = false;
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };



  return {
    data,
    isLoading,
    isError,
    load,
    getCats,
    page
  };
});

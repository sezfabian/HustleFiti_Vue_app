<template>
  <h1 class="text-xl font-sans font-bold ml-10 " >My Services - {{ services.length }}</h1>
  <div class="grid grid-cols-1 rows-6 gap-6 h-half md:grid-cols-2 lg:grid-cols-2 xxl:grid-cols-4 ms-6 mr-6">
    <div v-for="(service, index) in services" :key="service.id" class="serviceitem
     flex items-center  bg-transparent mt-5 rounded-xl justify-center text-center">
      <div class="rounded-full relative p-7">
        <img :src="getImageUrl(service.image_paths)" class="rounded h-[300px] w-[300px] object-cover" alt="No image" />
      </div>
      <div class="mt-4 mb-3 text-center">
        <h3 class="text-xl font-semibold">{{ service.name }}</h3>
        <button @click="toggleDescription(index)" class="text-blue-500 mt-2 cursor-pointer hover:underline">Show Description </button>
        <div v-if="service.showDescription" class="mt-2">
          <p>{{ service.description }}</p>
        </div>
        <div>
          <p><bold class="font-bold">Locations: </bold>  {{ service.locations.length > 0 ? service.locations : 'N/A' }}</p>
        </div>
        <div class="mt-2">
          <p>Duration: {{ service.price_packages.length > 0 ? service.price_packages[0].duration : 'N/A' }}
           Price: {{ service.price_packages.length > 0 ? service.price_packages[0].price : 'N/A' }}</p>
        </div>
      
        <button class="mt-2 bg-green-900 text-white  px-4 py-2 rounded-full
        hover:bg-green-600"
          @click="redirect('/edit-service/' + service.id)"> Edit Service</button>
      </div>
    </div>
    <div class="text-center justify-center flex mt-6">
          <button
            class="bg-green-900 text-white active:bg-gray-900 text-sm font-bold uppercase px-6 py-3
            rounded shadow hover:bg-green-700 outline-none focus:outline-none mr-1 mx-5  mb-10 w-full max-h-full min-h-[300px]"
            type="button"
            style="transition: all 0.15s ease 0s;"
            @click="redirect('/new-service')"
            > + Add Service
          </button>
      </div>
  </div>
</template>

<script>
import router from "@/router";
import HomeView from '@/views/HomeView.vue';

export default {
  components: { HomeView },
  name: 'userServices',
  data() {
    return {
      services: [],
      user_id: ""
    };
  },
  methods: {
    toggleDescription(index) {
      this.services[index].showDescription = !this.services[index].showDescription;
    },
    getImageUrl(images) {
      if (images === ""){
        return "https://i.postimg.cc/8zh6Fv2C/custom.png";
      }
      return images.split(',')[0];
    },
    fetchServices() {
      this.$instance.get("/services/")
        .then((response) => {
          this.services = response.data.map(service => {
          return {
            ...service,
            showDescription: false // Initially set to false, indicating descriptions are hidden
          };
          });
          this.services = this.services.filter(service => {
            return service.user_id == this.$Cookies.get('user_id');
          });
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        })
    },
    redirect(path) {
      router.push({ path: path });
    }

  },
  mounted() {
    this.fetchServices();
    this.user_id = this.$Cookies.get('user_id');
  },
};
  
</script>

<style scoped>
    font-family: 'Poppins', sans-serif;
h1 {
  font-family: 'Poppins', sans-serif;
}
</style>

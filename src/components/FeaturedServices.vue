<template>
  <h1 class="text-4xl font-extrabold text-center mt-6">Featured Services</h1>
    <h1 class="text-1xl font-bold text-center ms-6 mt-4">{{ filtered.length }} Services Found</h1>
  <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 xxl:grid-cols-5 lg:ms-6  mb-10 lg:mr-6">
    <div v-for="(service, index) in filtered" :key="service.id" class="serviceitem  justify-center align-middle flex
     flex-col  items-center w-full bg-[#d5e4d8] mt-4 shadow">
      <div class="h-half relative">
        <img :src="getImageUrl(service.image_paths)" class="h-[200px] w-[200px] mt-5 justify-center rounded-full object-cover" alt="No image" />
      </div>
      <div class="mt-4 mb-3 ml-4 flex flex-col justify-center text-center">
        <h3 class="text-xl font-semibold">{{ service.name }}</h3>
        <p class="text-gray-600">By: {{ service.user_name }}</p>
        <button @click="toggleDescription(index)" class="text-blue-500 mt-2 cursor-pointer hover:underline">Read more </button>
        <div v-if="service.showDescription" class="mt-2">
          <p>{{ service.description }}</p>
        </div>
        <div>
          <p>Locations:</p>
        </div>
          <div class="tag-container justify-evenly flex items-center">
              <div class="tag" v-for="(location, index) in getLocations(service.locations)" :key="index">
                {{ location }}
              </div>
            </div>
        <div class="mt-2">
          <p>{{ service.price_packages.length > 0 ? service.price_packages[0].duration : '1' }} Hour/s</p>
          <p>Ksh: {{ service.price_packages.length > 0 ? service.price_packages[0].price : 'Contact for Price' }}</p>
        </div>
        <div class="justify-evenly flex items-center">
        <button class="mt-2 bg-green-800 text-white px-4 py-2 w-[150px] hover:bg-gray-600"
        @click="bookService(service.id)">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'FeaturedServices',
  emits: ['bookService'],

  data() {
    return {
      search: "",
      selectedLocation: "",
      selectedCategory: "",
      locations: [],
      categories: [],
      services: [],
      filtered: [],
      message: "",
    };
  },
  methods: {
    fetchServices() {
       this.$instance.get("/services")
        .then((response) => {
          console.log(response);
          this.services = response.data.map(service => {
          return {
            ...service,
            showDescription: false // Initially set to false, indicating descriptions are hidden
          };
          });
          this.filtered = this.services.slice(0, 6);
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        })
    },

    fetchCategories() {
      this.$instance.get("/service_categories")
        .then((response) => {
          this.categories = response.data.map(category => {
          return {
            ...category,
          };
          });
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        })
    },
    toggleDescription(index) {
      this.services[index].showDescription = !this.services[index].showDescription;
    },
    getImageUrl(imagePaths) {
      if (imagePaths === "" || imagePaths === 'string') {
        return "https://i.postimg.cc/8zh6Fv2C/custom.png";
      }
      imagePaths = imagePaths.split(',');
      return imagePaths ? imagePaths : 'https://i.postimg.cc/8zh6Fv2C/custom.png';
    },
    changeImagesAutomatically() {
      setInterval(() => {
        this.services.forEach((service) => {
          if (service.image_paths && service.image_paths.split(',').length > 1) {
            const images = service.image_paths.split(',');
            const currentImageIndex = images.indexOf(service.currentImage);
            const nextImageIndex = (currentImageIndex + 1) % images.length;
            service.currentImage = images[nextImageIndex];
          }
        });
      }, 3000);
    },
    getLocations(locations) {
      if (locations === "" || locations === 'string') {
        return "N/A";
      }
      locations = locations.split(',');
      for (const location of locations) {
        if (!this.locations.includes(location)) {
          this.locations.push(location);
        }
      }
      return locations ? locations : 'N/A';
    },
    filterServices() {
      this.filtered = this.services.slice(0, 6);
      return this.filtered;
    },
    bookService(serviceId) {
      this.$emit("bookService", serviceId);
    }
  },
   mounted() {
    location.reload;
    this.fetchServices();
    this.fetchCategories();
    this.changeImagesAutomatically();
    console.log(this.$cookies);
  },
};
</script>

<style scoped>
    font-family: 'Poppins', sans-serif;
h1 {
  font-family: 'Poppins', sans-serif;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
}

.tag {
  background-color: #0b110e;
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  display: block;
  margin-left: -15px;
}
</style>

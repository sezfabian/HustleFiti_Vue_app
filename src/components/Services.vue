<template>
  <h1 class="text-4xl font-extrabold text-center mt-6">Services</h1>
    <div class="filters flex justify-center flex-col lg:flex-row space-x-4 mt-4">
      <label class="ms-4" for="locations">Location:</label>
      <select v-model="selectedLocation" @change="filterServices" id="location">
        <option value="">All</option>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>

      <label for="category">Category:</label>
      <select v-model="selectedCategory" @change="filterServices" id="category">
        <option value="">All</option>
        <option v-for="category in categories" :key="category">{{ category.name }}</option>
      </select>

      <input type="text" v-model="search" @change="filterServices" 
       class="mt-4 lg:mt-0" placeholder="Search..." />

    </div>
    <h1 class="text-1xl font-bold text-center ms-6 mt-4">{{ filtered.length }} Services Found</h1>
  <div class="grid  grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 lg:ms-6 lg:mr-6">
    <div v-for="(service, index) in filtered" :key="service.id" class="serviceitem w-full bg-white mt-4 shadow">
      <div class="h-half relative">
        <img :src="getImageUrl(service.image_paths)" class="h-[230px] w-full object-cover" alt="No image" />
      </div>
      <div class="mt-4 mb-3 ml-4">
        <h3 class="text-xl font-semibold">{{ service.name }}</h3>
        <p class="text-gray-600">By: {{ service.user_name }}</p>
        <button @click="toggleDescription(index)" class="text-blue-500 mt-2 cursor-pointer hover:underline">Read more </button>
        <div v-if="service.showDescription" class="mt-2">
          <p>{{ service.description }}</p>
        </div>
        <div>
          <p>Locations: {{ getLocations(service.locations) }}</p>
        </div>
        <div class="mt-2">
          <p>{{ service.price_packages.length > 0 ? service.price_packages[0].duration : 'Contact for Details' }}</p>
          <p>{{ service.price_packages.length > 0 ? service.price_packages[0].price : 'Contact for Price' }}</p>
        </div>
        <button class="mt-2 bg-green-800 text-white px-4 py-2 hover:bg-gray-600">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'Services',
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
          this.filtered = this.services;
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
      this.filtered = this.services;

      if (this.search !== "") {
        this.filtered = this.filtered.filter(service => {
          const nameMatch = service.name.toLowerCase().includes(this.search.toLowerCase());
          const locationMatch = service.locations.toLowerCase().includes(this.search.toLowerCase());
          const usernameMatch = service.user_name.toLowerCase().includes(this.search.toLowerCase());
          return nameMatch || locationMatch || usernameMatch;
        });
      }

      if (this.selectedLocation !== "") {
        this.filtered = this.filtered.filter(service => {
          return service.locations.includes(this.selectedLocation);
        })
      };
      
      if (this.selectedCategory !== "") {
        const selectedCategoryId = this.categories.find(category => category.name === this.selectedCategory)?.id;
        if (selectedCategoryId) {
          this.filtered = this.filtered.filter(service => {
            return service.service_category_id === selectedCategoryId;
          });
        }
      };

      if (!this.filtered) {
        this.message = "No services found";
      }

      return this.filtered;
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
</style>

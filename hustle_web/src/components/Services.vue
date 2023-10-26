<template>
  <h1 class="text-4xl font-extrabold text-center mt-6">Services</h1>
    <div class="filters flex justify-center space-x-4 mt-4">
      <label for="location">Location:</label>
      <select v-model="selectedLocation" @change="filterServices" id="location">
        <option value="">All</option>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>

      <label for="category">Category:</label>
      <select v-model="selectedCategory" @change="filterServices" id="category">
        <option value="">All</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
    </div>
  <div class="grid  grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 ms-6 mr-6">
    <div v-for="(service, index) in services" :key="service.id" class="serviceitem bg-gray-100 mt-10 shadow">
      <div class="h-half relative">
        <img :src="getImageUrl(service.image_paths)" class="h-2/5 object-cover" alt="/docs/images/examples/image-4@2x.jpg" />
      </div>
      <div class="mt-4 mb-3 ml-4">
        <h3 class="text-xl font-semibold">{{ service.name }}</h3>
        <p class="text-gray-600">By: {{ service.user_name }}</p>
        <button @click="toggleDescription(index)" class="text-blue-500 mt-2 cursor-pointer hover:underline">Read more </button>
        <div v-if="service.showDescription" class="mt-2">
          <p>{{ service.description }}</p>
        </div>
        <div>
          <p>Locations  {{ service.locations.length > 0 ? service.locations : 'N/A' }}</p>
        </div>
        <div class="mt-2">
          <p>Duration: {{ service.price_packages.length > 0 ? service.price_packages[0].duration : 'N/A' }}</p>
          <p>Price: {{ service.price_packages.length > 0 ? service.price_packages[0].price : 'N/A' }}</p>
        </div>
        <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  props: {
    servicesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedLocation: "",
      selectedCategory: "",
      services: []
  }
  },

  computed: {
    filteredServices() {
      let filtered = this.services;

      if (this.selectedLocation) {
        filtered = filtered.filter(service => service.locations.includes(this.selectedLocation));
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(service => service.sub_category === this.selectedCategory);
      }

      return filtered;
    },

    locations() {
      // Extract unique locations from services data
      return Array.from(new Set(this.services.map(service => service.locations).flat()));
    },

    categories() {
      // Extract unique categories from services data
      return Array.from(new Set(this.services.map(service => service.sub_category)));
    }
  },

  methods: {
    fetchServices() {
       this.$instance.get("/services")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        })
    },
    toggleDescription(index) {
      pass
    },
    getImageUrl(imagePaths) {
      imagePaths = imagePaths.split(',');
      return imagePaths ? imagePaths : 'default-image-url.jpg'; // Provide a default image URL if imagePaths is empty.
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

    filterServices() {
      
    }
  },
   mounted() {
    this.changeImagesAutomatically();
    this.fetchServices();
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

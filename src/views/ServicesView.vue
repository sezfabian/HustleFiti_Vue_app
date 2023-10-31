<template>
  <div class="about p-5">
    <Services @bookService="handleBooking"/>
  </div>
</template>

<script>
import Services from '@/components/Services.vue';
import BookingVue from '@/components/Booking.vue';
import router from '@/router';
export default {
  components: {
    Services, BookingVue
  },

  methods: {
    handleBooking(serviceId) {
      console.log(serviceId);
      router.push('/booking/:' + serviceId);
    }
  }
  
}
</script>
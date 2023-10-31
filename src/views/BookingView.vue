<template>
  <div class="flex justify-center items-center">
    <BookingVue />
  </div>
  
</template>

<script>
import BookingVue from '@/components/Booking.vue'

export default {
  name: 'BookingView',
  components: {
    BookingVue
  },
  props: {
      serviceId: {
          type: String,
          required: true
      }
  },

}
</script>

<style>

</style>
<template>
  <div class="flex justify-center">
  <EditService/>
  </div>
</template>

<script>
import EditService from '@/components/EditService.vue';

export default {
  name: "EditServiceView",
  props: {
      id: {
          type: String,
          required: true
      }
  },
  components: {
      EditService
  },
}
</script>

<style>
#view {
    background: linear-gradient(90deg, rgba(216,235,199,1) 0%, rgba(255,255,255,1) 99%)
}
</style>
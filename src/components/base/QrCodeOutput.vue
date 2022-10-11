<script setup>

  import  QRCode  from 'qrcode'
  import { ref } from 'vue'


  const p = defineProps({
    col: String,
    value: {
      type: String,
      default: 'Hello World'
    },

  });

  const imageData = ref(null)

  QRCode.toDataURL(p.value, /*{ errorCorrectionLevel: 'H' },*/ (err, url) => {
    imageData.value = url
  })

</script>
<template>
  <img :src="imageData" />
</template>

<style scoped>

</style>

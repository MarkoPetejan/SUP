<script setup>

  import { JsBarCode } from 'jsbarcode'
  import { createCanvas } from 'canvas'
  import { ref, onMounted } from 'vue'


  const p = defineProps({
    col: String,
    value: {
      type: String,
      default: '1234567890128'
    },
    type: {
      type: String,
      default: 'ean13'
    },
  });



  let barcode = ref(null)
  onMounted(() => {
    const canvas = createCanvas();
    JsBarcode(canvas, p.value, {format: p.type});
    console.log(canvas)
    barcode.value.height = canvas.height
    barcode.value.width = canvas.width
    const ctx = barcode.value.getContext('2d');
    ctx.drawImage(canvas, 0,0)
  })


  /*
  // https://github.com/lindell/JsBarcode

  CODE128
    CODE128 (automatic mode switching)
    CODE128 A/B/C (force mode)
  EAN
    EAN-13
    EAN-8
    EAN-5
    EAN-2
    UPC (A)
    UPC (E)
  CODE39
  ITF
    ITF
    ITF-14
  MSI
    MSI10
    MSI11
    MSI1010
    MSI1110
  Pharmacode
  Codabar
  */




  </script>
  <template>
    <canvas ref="barcode" width="250" height="150" >
      Barcode image.
    </canvas>



  </template>

  <style scoped>


  </style>

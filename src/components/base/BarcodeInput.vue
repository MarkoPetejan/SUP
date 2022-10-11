<script setup>
  import {ref, watch} from 'vue'
  import { state } from "src/stores/state";




  let video = ref(null)
  let container = ref(null)
  let ctx = null
  let worker = null

  const CANVAS_SIZE = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight
  };
  const focusBoxWidth = 500;
  const focusBoxHeight = 500;
  let oldTime = 0;

  const startVideo = () => {
    icon.value = true
    ctx = container.value.getContext('2d', { willReadFrequently: true });
    initWorker();
    navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "environment"}}).then(stream => {
      const track = stream.getVideoTracks()[0]
      track.applyConstraints({
        advanced: [{torch: true}]
      })
      video.value.srcObject = stream;
      video.value.play()
      requestAnimationFrame(tick);
    })
  }

  const stopVideo = () => {
    video.value.pause();
    video.value.srcObject.getVideoTracks().forEach(track => {
      track.applyConstraints({
        advanced: [{torch: false}]
      })
      track.stop()
    });
    video.value.srcObject = null;
  }

  const tick = (time) => {
    if (video.value.readyState === video.value.HAVE_ENOUGH_DATA) {


      container.value.width = Math.min(CANVAS_SIZE.WIDTH, video.value.videoWidth);
      container.value.height = Math.min(CANVAS_SIZE.HEIGHT, video.value.videoHeight);

      const sx = (container.value.width - focusBoxWidth) / 2;
      const sy = (container.value.height - focusBoxHeight) / 2;

      // ctx.drawImage(video.value, 0, 0);
      // ctx.fillStyle = "black";
      // ctx.globalAlpha = 0.8;
      // ctx.fillRect(0,0, container.width, container.height);
      ctx.drawImage(video.value, sx, sy, focusBoxWidth, focusBoxHeight, sx, sy, focusBoxWidth, focusBoxHeight);


      if (time - oldTime > 100) {
        oldTime = time;
        let imageData = ctx.getImageData(sx, sy, focusBoxWidth, focusBoxHeight);
        worker.postMessage({data: imageData.data, width: imageData.width, height: imageData.height});
      }
    }
    requestAnimationFrame(tick);
  }

  const beep = (freq = 750, duration = 150, vol = 8) => {
    try {
      const context = new AudioContext()
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      oscillator.frequency.value = freq;
      oscillator.type = "square";
      gain.connect(context.destination);
      gain.gain.value = vol * 0.01;
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration * 0.001);
    } catch (e) {
      console.warn("Sorry, Web Audio API is not supported by your browser");
      console.warn(e.toString());
    }
  };

  const initWorker = () => {
    worker = new Worker("wasmWorker.js");
    worker.onmessage = (ev) => terminateWorker(ev.data.data, ev.data.ms)
    worker.onerror = (err) => console.log(err)
  }

  const terminateWorker = (data, millis) => {
    worker.terminate();
    stopVideo();
    icon.value = false
    console.log(data, millis);
    if (typeof(data) == 'string') {
      state.barcode = data
      text.value = null
      beep()
    }

  };

  let text = ref('')
  let icon = ref(false)

  watch(
    () => icon.value,
    (icon) => {
      if (icon == true) setTimeout(() => {startVideo()}, 1)
      //if (icon == false) stopVideo()
    },
    { deep: false }
  )

  const onEnterKey = () => {
    state.barcode = text.value
    text.value = null
    beep()
  }

  // https://fengyuanchen.github.io/vue-barcode/

  </script>
  <template>

  <video ref="video" playsinline hidden></video>
  <canvas ref="container" hidden ></canvas>


    <q-input v-model="text" filled bottom-slots  label="BarCode" counter maxlength="13" dense
      @keyup.enter="onEnterKey"
    >
          <template v-slot:before>
            <q-icon name="sym_o_barcode" />
          </template>

          <template v-slot:hint>
            Last value: {{state.barcode}}
          </template>

          <template v-slot:append>
            <q-btn round dense flat icon="sym_o_barcode_scanner" @click="icon=true" />
          </template>
        </q-input>

    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            <q-icon name="sym_o_barcode" class="q-mx-lg" />
            Scan barcode
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="terminateWorker" />
        </q-card-section>

        <q-card-section>
          <!-- <q-btn @click="startVideo">Play</q-btn>
          <q-btn @click="stopVideo">Stop</q-btn> -->

          <video ref="video" playsinline hidden ></video>
          <canvas ref="container" style="width: 100%; height: 100%" ></canvas>

        </q-card-section>
      </q-card>
    </q-dialog>



  </template>

  <style scoped>


  </style>

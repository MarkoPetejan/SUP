<script setup>
  import { ref } from 'vue'


  let foundBeacon = ref(false)
  let foundMinor = ref(null)
  let foundMajor = ref(null)
  let foundPower = ref(null)
  let rssi = ref(null)
  let lat = ref(null)
  let lon = ref(null)
  let time = ref(null)

  let scan;
  const bluetooth = navigator.bluetooth;
  let options = {
    acceptAllAdvertisements: true,
  };

  options = {
    acceptAllAdvertisements: true,
    options: {
      keepRepeatedDevices: true,
    }
  }

  const logEvent = (event) => {
    rssi.value = event.rssi
    event.manufacturerData.forEach((valueDataView, key) => {
      const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
        return b.toString(16).padStart(2, '0');
      }).join('');
      if (hexString.length != 46) return
      console.log('PAYLOAD', hexString, hexString.length)
      const h = hexString.substring(4, 36)
      const uuid = h.substring(0, 8) + '-' + h.substring(8, 12) + '-' + h.substring(12, 16) + '-' + h.substring(16, 20) + '-' + h.substring(20, 32)
      foundBeacon.value = uuid // 14e335b4-eef2-4f47-bfc9-ec2b246a8de3
      foundMajor.value = hexString.substring(36, 40)
      foundMinor.value = hexString.substring(40, 44)
      foundPower.value = hexString.substring(44, 46)
      console.log(uuid)
      stop()
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position)
          lat.value = position.coords.latitude
          lon.value = position.coords.longitude
          time.value = new Date(position.timestamp)
        }, (err) => {
          console.log('GPS error', err)
        }, options);
      } else {
        console.log('Geolocation not available')
      }
    });




  }

  const start = (event) => {
    // chrome://flags/#enable-experimental-web-platform-features
    const promise = navigator.bluetooth.requestLEScan(options);
    promise.then((result) => {
      scan = result;
      bluetooth.addEventListener('advertisementreceived', logEvent);
    });
  }

  const stop = (event) => {
    if (scan.active) {
      scan.stop();
      bluetooth.removeEventListener('advertisementreceived', logEvent);
    }

  }

  // https://webbluetoothcg.github.io/web-bluetooth/scanning.html
  // function recordNearbyBeacon(major, minor, pathLossVs1m) { ... }
  // navigator.bluetooth.requestLEScan({
  //   filters: [{manufacturerData: {0x004C: {dataPrefix: new Uint8Array([
  //     0x02, 0x15, // iBeacon identifier.
  //     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15  // My beacon UUID.
  //   ])}}}],
  //   keepRepeatedDevices: true
  // }).then(() => {
  //   navigator.bluetooth.addEventListener('advertisementreceived', event => {
  //     let appleData = event.manufacturerData.get(0x004C);
  //     if (appleData.byteLength != 23) {
  //       // Isn’t an iBeacon.
  //       return;
  //     }
  //     let major = appleData.getUint16(18, false);
  //     let minor = appleData.getUint16(20, false);
  //     let txPowerAt1m = -appleData.getInt8(22);
  //     let pathLossVs1m = txPowerAt1m - event.rssi;

  //     recordNearbyBeacon(major, minor, pathLossVs1m);
  //   });
  // })


  </script>
  <template>

  <q-btn @click="start">Start</q-btn>
  <q-btn @click="stop">Stop</q-btn>

  <pre>{{foundBeacon}}</pre>
  <pre>{{foundMinor}}</pre>
  <pre>{{foundMajor}}</pre>
  <pre>{{foundPower}}</pre>
  <pre>{{rssi}}</pre>
  <pre>{{lat}}</pre>
  <pre>{{lon}}</pre>
  <pre>{{time}}</pre>




  </template>

  <style scoped>


  </style>

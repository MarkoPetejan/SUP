<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { getStorage, ref as fbs_ref, uploadBytes, getDownloadURL, uploadString  } from "firebase/storage";
  import VueCropper from '@ballcat/vue-cropper';
  import 'cropperjs/dist/cropper.css';
  import { state } from "src/stores/state"

  const p = defineProps({
    col: String,
    fld: {
      type: String,
      default: 'image'
    },
    nameFld: {
      type: String,
      default: 'name'
    },
  });

  const c = state.collections[p.col]
  const f = c.columns.find(o => o.name === p.fld)
  const fN = c.columns.find(o => o.name === p.nameFld)
  const z = f.required ? ' *' : ''


  const storage = getStorage()
  const hiddenInputRef = ref(null)
  const vueCropperRef = ref(null)
  const showDialog = ref(false)
  // const fileContent = ref(null)

  const avatarSize = f?.size || 100
  const badgeIconSize = Math.round(avatarSize/ 4)
  const badgeStyle = `
    width:${badgeIconSize}px;
    height:${badgeIconSize}px;
    cursor: pointer;
  `

  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

  // const convertURIToImageData = (URI) => {
  //   return new Promise(function(resolve, reject) {
  //     if (URI == null) return reject();
  //     var canvas = document.createElement('canvas'),
  //         context = canvas.getContext('2d'),
  //         image = new Image();
  //     image.addEventListener('load', function() {
  //       canvas.width = image.width;
  //       canvas.height = image.height;
  //       context.drawImage(image, 0, 0, canvas.width, canvas.height);
  //       resolve(context.getImageData(0, 0, canvas.width, canvas.height));
  //     }, false);
  //     image.src = URI;
  //   });
  // }

  const getColorFromString = (string) => {
    const colorPalette = [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deep-orange',
      'brown',
      'grey',
      'blue-grey',
      'dark'
    ]
    console.log(string)

    let hash = 0;
    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    // return hash >>> 0;   // returns hash as positive 32-bit integer
    // return hash & 0xffff; // return lower 16-bits of hash value
    hash = hash >>> 0
    const colorIndex = hash % colorPalette.length // color index from palette of colors
    console.log(colorIndex)
    return colorPalette[colorIndex]
  };

  // const imageFieldValue = c.record[f.name]
  // const nameFieldValue = c.record[fN.name]


  console.log('c.record[fN.name]', c.record[fN.name])
  const itemColor = getColorFromString(c.record[fN.name] || c.record[f.name] || 'primary')
  const itemLetters = (c.record[fN.name] || '').replace(/\./g, ' ').split('@')[0].match(/(^\S\S?|\s\S)?/g).map(v=>v.trim()).join("").match(/(^\S|\S$)?/g).join("").toLocaleUpperCase()



  const showFileDialog = (item) => {
    hiddenInputRef.value.click()
  }

  const resetFileDialog = (e) => {
      e.target.value = null
  }

  const setAvatar = async(e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return

    c.record[f.name] = await toBase64(file)
    console.log(c.record[f.name].length)
    // const storageRef = fbs_ref(storage, file.name);
    // const snapshot = await uploadBytes(storageRef, file)
    // const fileUrl = await getDownloadURL(snapshot.ref)
    showDialog.value = true
  }

  const saveImage = async() => {
    c.record[f.name] = vueCropperRef.value?.getCroppedCanvas().toDataURL("image/webp",0.1) // webp ni podprt v safariju, png je prevelik, jpg je zastarel
    console.log(c.record[f.name].length)

    // const imageObject = await convertURIToImageData(c.record[f.name])
    // console.log(imageObject.data.length)

    const storageRef = fbs_ref(storage, `avatars/avatar_${c.recId}.webp`);
    const snapshot = await uploadString(storageRef, c.record[f.name], 'data_url')
    const fileUrl = await getDownloadURL(snapshot.ref)
    c.record[f.name] = fileUrl
    showDialog.value = false
    console.log(fileUrl)
  }

  </script>
  <template>

    <q-item-section avatar style="margin: 15px;">
        <q-avatar v-if="c.record[f.name] && c.record[f.name].length > 0" :size="avatarSize+'px'">
          <img :src="c.record[f.name]" onerror="this.style.display='none'" loading="lazy" />
          <q-badge floating rounded color="primary" :style="badgeStyle" @click="showFileDialog(item)">
            <q-icon name="edit" style="width:100%; height:100%" />
          </q-badge>
        </q-avatar>
        <q-avatar v-else :color="itemColor" text-color="white" :size="avatarSize+'px'">
          {{ itemLetters }}
          <q-badge floating rounded color="primary" :style="badgeStyle" @click="showFileDialog(item)">
            <q-icon name="add" style="width:100%; height:100%" />
          </q-badge>
        </q-avatar>
    </q-item-section>
    <input ref="hiddenInputRef" type="file" accept="image/*" @change="setAvatar" @click="resetFileDialog" style="display: none;" />

    <q-dialog v-model="showDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card-section>
          <vue-cropper ref="vueCropperRef" :src="c.record[f.name]" alt="Avatar image" :aspectRatio="1"
            style="width: 500px; height: 500px" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Skip" @click="showDialog = false" />
          <q-btn v-close-popup flat color="primary" label="Crop" @click="saveImage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

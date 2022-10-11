<script setup>
import { ref } from 'vue'

let year = 2022

let cellSize = ref('1fr')
let selectionMode = ref(false)
let celice = ref(null)

//celice.value = Array(495).fill('g')

// const numToMonth = (idx) => {
//   if (idx == 0) return ''
//   const date = new Date(2018, idx-1, 1);
//   return date.toLocaleString('default', { month: 'long' });
// }

// const numToDayOfWeek = (idx) => {
//   const date = new Date(2018, idx-1, 1);
//   return date.toLocaleString('default', { weekday: 'short' });
// }

const aliDelaProstiDan = (datum) => {
  const getEaster = (Y) => {
    const C = Math.floor(Y/100);
    const N = Y - 19*Math.floor(Y/19);
    const K = Math.floor((C - 17)/25);
    let I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    let J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    const L = I - J;
    const M = 3 + Math.floor((L + 40)/44);
    const D = L + 28 - 31*Math.floor(M/4);

    return {
      mesec: M,
      dan: D
    }
  }


  const mesec = datum.getMonth() + 1
  const dan = datum.getDate()
  const leto = datum.getYear()
  const velikaNoc = getEaster(leto)
  let p = false
  // državni prazniki - dela prosti dnevi
  if ((mesec == 1) && (dan == 1)) p = 'novo leto'
  if ((mesec == 1) && (dan == 2)) p = 'novo leto'
  if ((mesec == 2) && (dan == 8)) p = 'Prešernov dan, slovenski kulturni praznik'
  if ((mesec == 4) && (dan == 27)) p = 'dan upora proti okupatorju'
  if ((mesec == 5) && (dan == 1)) p = 'praznik dela'
  if ((mesec == 5) && (dan == 2)) p = 'praznik dela'
  if ((mesec == 6) && (dan == 25)) p = 'dan državnosti'
  if ((mesec == 11) && (dan == 1)) p = 'dan spomina na mrtve'
  if ((mesec == 12) && (dan == 26)) p = 'dan samostojnosti in enotnosti'
  // drugi dela prosti dnevi
  if ((mesec == 8) && (dan == 15)) p = 'Marijino vnebovzetje'
  if ((mesec == 10) && (dan == 31)) p = 'dan reformacije'
  if ((mesec == 12) && (dan == 25)) p = 'božič'
  // izračunani dela prosti dnevi
  if ((mesec == velikaNoc.mesec) && (dan == velikaNoc.dan)) p = 'velikonočna nedelja'
  if ((mesec == velikaNoc.mesec) && (dan == velikaNoc.dan + 1)) p = 'velikonočni ponedeljek'
  if ((mesec == velikaNoc.mesec) && (dan == velikaNoc.dan + 49)) p = 'binkoštna nedelja - binkošti'

  return p
}

const getMonthNames = () => {
  const list = []
  for (let i = 0; i < 12; i++) {
    const date = new Date(2018, i, 1)
    list.push(date.toLocaleString('default', { month: 'long' }))
  }
  return list
}

const getDayNames = () => {
  const list = []
  for (let i = 1; i <= 38; i++) {
    const date = new Date(2018, 0, (i % 38))
    list.push(date.toLocaleString('default', { weekday: 'short' }))
  }
  return list
}
const monthNames = getMonthNames()
const dayNames = getDayNames()


let c = []
for (let i = 0; i < 495; i++) {
  c[i] = {
    class: 'g',
    i: i,
    monthNr: Math.floor((i-1) / 38) || null,
    frac: ((i-1) % 38),
    monthName: null,
    text: null,
    dow: null,
    date: null,
    dpd: null,
    hint: null,
  }
  c[i].monthName = monthNames[c[i].monthNr-1] || null
  c[i].dow = dayNames[i-2]
  c[i].dowi = ((i-1) % 38) % 7 || 7
  // imena mesecev
  if (!c[i].frac) {
    c[i].text = c[i].monthName
    c[i].class = 's'
  }
  // imena dnevov v tednu
  if (!c[i].monthNr && i) {
    c[i].text = c[i].dow
    c[i].class = 's'
    if (c[i].dowi > 5) c[i].class = 'n'
  }
  // prikaz izbranega leta
  if (!c[i].monthNr && !c[i].frac) {
    c[i].text = year
    c[i].class = 'y'
  }
  // vsi aktivni dnevi
  if (c[i].monthNr && c[i].frac) {
    const offset = new Date(year, c[i].monthNr-1, 1).getDay() || 7

    if (c[i].frac >= offset) {
      let d = new Date(year, c[i].monthNr-1, c[i].frac) // -offset+1
      d.setDate(d.getDate() - offset+1)
      if (d.getMonth() == c[i].monthNr-1) {
        c[i].date = d
        c[i].dpd = aliDelaProstiDan(d)
        c[i].text = `${d.getDate()}`
        c[i].class = 'w'
        if (c[i].dowi > 5) c[i].class = 'n'
        if (c[i].dpd) {
          c[i].class = 'dpd'
          c[i].hint = 'Dela prost dan: ' + c[i].dpd
        }
      }

    }

  }

}
celice.value = c


const setColor = (idx) => {
  if (!selectionMode.value) return
  if (celice.value[idx].date) celice.value[idx].class = 'red'

}














/*
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

*/


// const onResize = (size) => {
//   console.log(size)
//   cellSize.value = `${Math.max( 25, size.width / 38 )}px`
// }











</script>
<template>

  <div class="tabela" @mousedown="selectionMode=true" @mouseup="selectionMode=false" @mouseleave="selectionMode=false" >
    <!-- <q-resize-observer @resize="onResize" /> -->
    <div v-for="y in 494" @mousemove="setColor(y)" :class="celice[y].class" :id="'c'+y" >
      {{celice[y].text}}
    </div>
  </div>
<span>

</span>

</template>
<style >
  .tabela {
    display: grid;
    grid-template-columns: repeat(38, v-bind(cellSize));
    grid-template-rows: repeat(13, v-bind(cellSize));


    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }
  .red {
    background-color: red;
    border: 1px solid black;
  }
  .g {
    background-color: rgb(167, 165, 165);
    border: 1px solid black;
  }
  .w {
    background-color: white;
    border: 1px solid black;
  }
  .n {
    background-color: rgb(207, 205, 213);
    border: 1px solid black;
  }
  .s {
    background-color: rgb(205, 192, 192);
    border: 1px solid black;
  }
  .y {
    background-color: rgb(148, 206, 189);
    border: 1px solid black;
  }
  .dpd {
    background-color: rgb(238, 107, 216);
    border: 1px solid black;
  }
  .tabela>div {
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /*
  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .row>div {
    display: flex;

    background-color: silver;
    border: 1px solid;
    border-color: black;
    justify-content: center;
    align-items: center;
  }
  .days {
    width: 100%;

  }
  */
</style>

import { Platform } from 'quasar'

const isMobile = Platform.is.mobile

const ignoreList = ['ErrorNotFound', 'IndexPage', 'Home']
let importList = import.meta.glob('../pages/*.vue')
Object.keys(importList).forEach((key) => {
  if (ignoreList.some(txt => key.includes(txt))) delete importList[key]
})
const startIndex = '../pages/'.length
const routesAuto = Object.keys(importList).map(key => {
  const fn = '/' + key.substring(startIndex, key.length - 4)
  const url = fn.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase() // kebab-case
  const cmp = importList[key]
  let naslov = fn.replace(/([a-z0–9])([A-Z])/g, "$1 $2").replace('/', '') // Pascal Case Z Presledki
  console.log(fn)
  return {
    path: url + '/:pid?',
    component: () => isMobile ? import('layouts/MobileLayout.vue') : import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: cmp }
    ],
    meta: {
      title: naslov.replace('List ', ''),
      caption: naslov.replace('List ', 'List: '),
      icon: "folder",
      link: '#' + url,
    }
  }
})



const routes = [
  // {
  //   path: '/',
  //   component: () => isMobile ? import('layouts/MobileLayout.vue') : import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Classes.vue') },
  //     { path: 'payments', component: () => import('pages/Payments.vue') },
  //     { path: 'events', component: () => import('pages/Events.vue') },
  //     { path: 'messages', component: () => import('pages/Messages.vue') },
  //     { path: 'more', component: () => import('pages/More.vue') }
  //   ]
  // },

  {
    path: '/',
    component: () => isMobile ? import('layouts/MobileLayout.vue') : import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ],
    meta: {
      title: "Home",
      caption: "Začetna stran",
      icon: "home",
      link: "/",
    }
  },

  {
    path: '/login',
    component: () => import('pages/auth/LoginForm.vue')
  },

  {
    path: '/register',
    component: () => import('pages/auth/RegisterForm.vue')
  },

  ...routesAuto,


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

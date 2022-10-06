<script setup>

import { getFunctions, httpsCallable, connectFunctionsEmulator  } from "firebase/functions";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { useQuasar } from "quasar";
import { reactive } from "vue";

const auth = getAuth();
const func = getFunctions();
//connectFunctionsEmulator(func, "localhost", 5001)
//connectAuthEmulator(auth, "http://localhost:9099")

const $q = useQuasar();

const login = reactive({
  displayName: 'Marko Petejan',
  email: 'marko.petejan@gmail.com',
  password: 'tiramisu',
  accept: true,
  isCompany: false,
  companyName: 'MordiCom d.o.o.',
  countryCode: 'SI',
  vatNumber: '82382905',
  newUser: null,
  userCredential: null,

})

const notify = (type, message) => {
  if (type == 'error') {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: message,
      timeout: 2000,
    })
  }
  if (type == 'info') {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: message,
      timeout: 1000,
    });
  }

}

const anonLogin = async() => {
  try {
    if (!login.userCredential) {
      login.userCredential = await signInAnonymously(auth)
      localStorage.setItem('anonimni user', JSON.stringify(login.userCredential.user));
    }
    return true
  } catch (error) {
    notify('error', error.message)
    return false
  }
}

const validateVAT = async() => {
  if (!login.userCredential) await anonLogin()
  const rpc_validateVAT = httpsCallable(func, 'validateVAT');
  const res = await rpc_validateVAT({
    countryCode: login.countryCode,
    vatNumber: login.vatNumber,
  })
  login.validatedVAT = res.data;
}

const registerNewCustomer = async() => {
  const rpc_registerNewCustomer = httpsCallable(func, 'registerNewCustomer');
  const res = await rpc_registerNewCustomer({
    displayName: login.displayName,
    email: login.email,
    password: login.password,
    companyName: login.companyName,
    countryCode: login.countryCode,
    vatNumber: login.vatNumber,
    userUID: login.userCredential.user.uid
  })
  const data = res.data
  if (data.error) {
    notify('error', data.error.message)
    return false
  } else {
    notify('info', "Logged in as user " + data.user.email)
    login.newUser = data
    localStorage.setItem('tenantId', data.tenantId)
    return true
  }
}

const realLogin = async() => {
  try {
    login.userCredential = await signInWithEmailAndPassword(auth, login.email, login.password)
    localStorage.setItem('currentUser', JSON.stringify(login.userCredential.user))
    return true
  } catch (error) {
    notify('error', error.message)
    return false
  }
}




const onSubmit = async() => {

  if (login.accept !== true) {
    notify('error', "You need to accept the license and terms first")
    return
  }

  try {
    await anonLogin()
    //await validateVAT()
    await registerNewCustomer()
    await realLogin()
    window.location.href = window.location.href.replace('/register', '')
  } catch (error) {
    notify('error', error.message)
  }






};





const onReset = () => {
  Object.keys(login).forEach(key => login[key] = null)
};

const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Invalid email";
};

const EU_COUNTRIES_CODES = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'EL', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'XI']
</script>

<template>
  <div class="fit row wrap justify-center items-start content-start">
    <div class="q-pa-md" style="width: 400px; top: 100px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

        <q-input
          filled
          name="displayName"
          v-model="login.displayName"
          label="Display Name *"
          hint="John Doe"
          lazy-rules
          :rules="[(val) => !!val || 'Email is missing']"
        />

        <q-input
          filled
          name="email"
          v-model="login.email"
          label="Your e-mail *"
          hint="Enter your e-mail address"
          lazy-rules
          :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
        />

        <q-input
          filled
          name="password"
          type="password"
          v-model="login.password"
          label="Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 5) || 'Password must be at least 6 characters!']"
        />

        <q-input
          filled
          name="password"
          type="password"
          v-model="login.password"
          label="Repeat password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 5) || 'Password must be at least 6 characters!']"
        />

        <q-toggle v-model="login.isCompany" label="I'm registering as an EU company" />
        <q-input
          v-if="login.isCompany"
          filled
          name="companyName"
          v-model="login.companyName"
          label="Your company name"
          lazy-rules

        />

        <q-select
          v-if="login.isCompany"
          filled
          name="countryCode"
          v-model="login.countryCode"
          label="Company VAT country code"
          lazy-rules
          :options="EU_COUNTRIES_CODES"
        />

        <q-input
          v-if="login.isCompany"
          filled
          name="vatNumber"
          v-model="login.vatNumber"
          label="Company VAT number"
          lazy-rules
        />

        <q-toggle v-model="login.accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>

  <pre>{{login}}</pre>
</template>

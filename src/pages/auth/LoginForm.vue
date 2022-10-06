<script setup>
import { useQuasar } from "quasar";
//import { ref } from "vue";
import { ref } from "@vue/reactivity";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const accept = ref(false);

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    login();
  }
};

const onReset = () => {
  email.value = null;
  password.value = null;
  accept.value = false;
};

const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Invalid email";
};

const login = () =>
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
      // Signed in
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Logged in as user " + userCredential.user.email,
      });
      location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      let msg = errorMessage;
      if (errorCode == "auth/wrong-password") msg = "Error: Wrong password!";
      if (errorCode == "auth/user-not-found") msg = "Error: User not found!";
      if (errorCode == "auth/too-many-requests")
        msg =
          "Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";

      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: errorCode + " " + errorMessage,
      });
    });
</script>

<template>
  <div class="fit row wrap justify-center items-start content-start">
    <div class="q-pa-md" style="width: 400px; top: 100px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          name="email"
          v-model="email"
          label="Your e-mail *"
          hint="Enter your e-mail address"
          lazy-rules
          :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
        />

        <q-input
          filled
          name="password"
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

      New user? <a href="#/register">Click here to register</a>
    </div>
  </div>
</template>

<template>
  <q-form @submit="submitForm">
    <div class="q-mb-md">
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <span class="capitalize">{{ tab }}</span> to access your Todos anywhere
      </q-banner>
    </div>

    <div class="q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
        lazy-rules="" />
    </div>
    
    <div class="q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        type="password"
        label="Password"
        stack-label
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 caracters']"
        lazy-rules
         />
    </div>
    
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        :label="tab"
        type="submit" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    },
    ...mapActions('auth', ['registerUser', 'loginUser']),
  },
}
</script>

<style>
.capitalize {
  text-transform: capitalize;
}
</style>
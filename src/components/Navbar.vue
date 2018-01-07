<template>
  <div class="my-navbar">
    <nav class="navbar" role="navigation" aria-label="navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          Telos2
        </router-link>
        <p class="navbar-item" v-if="email != ''">
        (login as {{ email }})
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Navbar',
  data() {
    return {
      email: '',
    };
  },
  created() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.email = currentUser.email;
    }
  },
};
</script>

<template>
  <div class="signup">
    <my-navbar></my-navbar>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <section class="hero is-success">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Sign Up</h1>
              <h2 class="subtitle">
                Already have account? -> <u><router-link to="/signin">Sign in.</router-link></u>
              </h2>
            </div>
          </div>
        </section>
        <section class="section">
          <article class="message is-danger" v-if="errorMessage != ''">
            <div class="message-body">{{ errorMessage }}</div>
          </article>
          <form v-on:submit.prevent="onSignUp">
            <!-- Email -->
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" name="email" placeholder="Email" v-model="email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </p>
            </div>
            <!-- Password -->
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <!-- Buttons -->
            <div class="field is-grouped">
              <p class="control">
                <input type="submit" class="button is-success" value="Sign up">
              </p>
              <p class="control">
                <input type="reset" class="button" value="Reset">
              </p>
              <p class="control">
                <router-link to="/signup" class="button is-text">Sign up</router-link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Navbar from './Navbar';

export default {
  name: 'SignIn',
  data() {
    return {
      errorMessage: '',
      email: '',
      password: '',
    };
  },
  components: {
    'my-navbar': Navbar,
  },
  methods: {
    onSignUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        // eslint-disable-next-line
        (user) => {
          this.$router.push('/');
        },
        (err) => {
          this.errorMessage = err.message;
        },
      );
    },
  },
};
</script>


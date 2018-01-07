<template>
  <div class="tasks">
    <my-navbar></my-navbar>
    <section class="section">
      <h1 class="title">Tasks</h1>
      <table class="table is-hoverable">
        <thead>
          <th>Name</th>
          <th>Interval</th>
          <th>Last</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr v-for="task in tasks">
            <td>{{ task.name }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
// import firebase from 'firebase';
// import Vuex from 'vuex';
// import { firebaseAction } from 'vuexfire';
import Navbar from './Navbar';

export default {
  name: 'Tasks',
  components: {
    'my-navbar': Navbar,
  },
};
</script>


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
          <tr v-for="(task, key) in tasks">
            <td>{{ task.name }}</td>
            <td>{{ task.interval }}</td>
            <td>{{ task.last_date }}</td>
            <td>
              <a class="button is-primary" v-on:click="doTask(key)">Done</a>
              <a class="button is-danger" v-on:click="deleteTask(key)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase';
import Navbar from './Navbar';

export default {
  name: 'Tasks',
  components: {
    'my-navbar': Navbar,
  },
  methods: {
    doTask(key) {
      alert(key);
    },
    deleteTask(key) {
      alert(key);
    },
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      tasks: {},
    };
  },
  created() {
    const currentUser = firebase.auth().currentUser;
    // eslint-disable-next-line
    firebase.database().ref(`tasks/${currentUser.uid}`).once('value').then((snapshot) => {
      this.tasks = snapshot.val();
    });
  },
};
</script>


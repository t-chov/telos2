<template>
  <div class="tasks">
    <my-navbar></my-navbar>
    <section class="section columns">
      <div class="column is-two-thirds">
        <h1 class="title">Tasks</h1>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th>Name</th>
            <th>Interval</th>
            <th>Latest</th>
            <th>Due</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(task, key) in tasks">
              <td>{{ task.name }}</td>
              <td>{{ task.interval }}</td>
              <td>{{ task.last_date }}</td>
              <td>
                <strong v-if="getDue(task.interval, task.last_date) < 0" class="has-text-danger">
                  {{ getDue(task.interval, task.last_date) }} days
                </strong>
                <p v-else>
                  {{ getDue(task.interval, task.last_date) }} days
                </p>
              </td>
              <td>
                <a class="button is-success" v-on:click="doTask(key)">Done</a>
                <a class="button is-danger" v-on:click="deleteTask(key)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column">
        <h2 class="title">Add task</h2>
        <form>
          <div class="field">
            <label class="label">Task name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Running, Study, Reading, etc." v-model="task_name">
            </div>
          </div>
          <div class="field">
            <label class="label">Interval</label>
            <div class="control">
              <input class="input" type="number" placeholder="lager than 0" v-model="interval">
            </div>
          </div>
          <div class="field">
            <label class="label">Last</label>
            <div class="control">
              <input class="input" type="date" placeholder="Your latest activity" v-model="last_date">
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <a class="button is-primary" v-on:click="addTask">Add</a>
            </div>
            <div class="control">
              <input type="reset" class="button is-text" value="Reset">
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';
import moment from 'moment';
import Navbar from './Navbar';

export default {
  name: 'Tasks',
  components: {
    'my-navbar': Navbar,
  },
  methods: {
    addTask() {
      const currentUser = firebase.auth().currentUser;
      const newKey = firebase.database().ref(`tasks/${currentUser.uid}`).push({
        owner: currentUser.email,
        name: this.task_name,
        interval: this.interval,
        last_date: this.last_date,
      });
      Vue.set(this.tasks, newKey.key, {
        name: this.task_name,
        interval: this.interval,
        last_date: this.last_date,
      });
    },
    doTask(key) {
      const currentUser = firebase.auth().currentUser;
      const date = new Date();
      const today = date.toISOString().split('T')[0];
      firebase.database().ref(`tasks/${currentUser.uid}/${key}`).update({
        last_date: today,
      });
      Vue.set(this.tasks[key], 'last_date', today);
    },
    deleteTask(key) {
      const currentUser = firebase.auth().currentUser;
      firebase.database().ref(`tasks/${currentUser.uid}`).update({
        [key]: null,
      });
      Vue.delete(this.tasks, key);
    },
    getDue(interval, latest) {
      const latestMoment = moment(latest);
      const due = latestMoment.add(interval, 'days');
      const now = moment();
      return due.diff(now, 'days');
    },
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      tasks: {},
      task_name: null,
      interval: null,
      last_date: null,
    };
  },
  created() {
    const currentUser = firebase.auth().currentUser;
    // eslint-disable-next-line
    firebase.database().ref(`tasks/${currentUser.uid}`).once('value').then((snapshot) => {
      this.tasks = (snapshot.val() != null) ? snapshot.val() : {};
    });
  },
};
</script>


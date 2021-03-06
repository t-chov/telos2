import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Tasks from '@/components/Tasks';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tasks',
      component: Tasks,
      // eslint-disable-next-line
      beforeEnter: (to, from, next) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          next();
        } else {
          next('/signin');
        }
      },
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/signout',
      name: 'SignOut',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        firebase.auth().signOut();
        next();
      },
    },
  ],
});

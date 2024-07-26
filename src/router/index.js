import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Login/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import Authorization from '@/components/Authorization.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    }
  ]
});

// Add a navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('token'); // Check for the token in local storage

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Authorization' }); // Redirect to the authorization page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
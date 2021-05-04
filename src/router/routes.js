
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/web/index.vue') },
      { path: '/login', component: () => import('pages/auth/index.vue') },
      {
        path: '/clinic',
        meta: { requiresAuth: true },
        component: () => import('pages/clinic/index.vue')
      },
      {
        path: '/stock',
        meta: { requiresAuth: true },
        component: () => import('pages/stock/index.vue')
      },
      {
        path: '/calendar',
        meta: { requiresAuth: true },
        component: () => import('pages/calendar/index.vue')
      },
      //auth
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

import layout from 'layouts/MainLayout.vue'
import login from 'pages/auth/index.vue'
import error from 'pages/Error404.vue'

import web from 'pages/web/index.vue'

import calendar from 'pages/calendar/index.vue'

import stock from 'pages/stock/index.vue'
import items from 'pages/stock/items.vue'
import buys from 'pages/stock/buys.vue'
import suppliers from 'pages/stock/suppliers.vue'

import clinic from 'pages/clinic/index.vue'

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      { path: '/', component: web },
      { path: '/login', component: login },
      {
        path: '/clinic',
        meta: { requiresAuth: true },
        component: clinic
      },
      {
        path: '/stock',
        meta: { requiresAuth: true },
        component: stock,
        children: [
          { path: '/stock/', component: items },
          { path: '/stock/suppliers', component: suppliers },
          { path: '/stock/buys', component: buys },
        ]
      },
      {
        path: '/calendar',
        meta: { requiresAuth: true },
        component: calendar
      },
      //auth
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: error
  }
]

export default routes

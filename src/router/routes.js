
export default [
  {
    path: '/',
    component: () => import('pages/Gold')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

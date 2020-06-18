export const routersNotAuth = [
  {
    exact: true,
    path: '/login',
    component: 'login'
  }
]

export const routersAuth = [
  {
    exact: true,
    path: '/home',
    component: 'home'
  },
  {
    exact: true,
    path: '/customers',
    component: 'customers'
  },
  {
    exact: true,
    path: '/stores',
    component: 'stores'
  }
]
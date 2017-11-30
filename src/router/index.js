import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import outter from '../components/outter'
import login from '@/views/login'
import register from '@/views/register'
import forgetpw from '@/views/forgetpw'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/outter',
      name: 'outter',
      component: outter,
      children: [{
          path: 'login',
          component: login,
        },
        {
          path: 'register',
          component: register
        },
        {
          path: 'forgetpw',
          component: forgetpw
        }
      ]
    }
  ]
})

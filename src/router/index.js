import { createRouter, createWebHistory } from 'vue-router'
import layoutDefault from '@/layouts/layoutDefault.vue'
import LoginLayout from '@/views/LoginLayout.vue'
import ListaOngs from '@/views/Ongs/ListaOngs.vue'
import NovaOng from '@/views/Ongs/NovaOng.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pets',
      name: 'Pets',
      component: () => import('@/views/Pet/Pets.vue')
    },
    {
      path: '/pets/new',
      name: 'NewPet',
      component: () => import('@/views/Pet/NewPet.vue')
    },
    {
      path: '/pets/:id',
      name: 'PetDetail',
      component: () => import('@/views/Pet/PetDetail.vue')
    },
    {
      path: '/pets/:id/edit',
      name: 'EditPet',
      component: () => import('@/views/Pet/EditPet.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginLayout
    },
    {
      path: '/',
      component: layoutDefault,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/dashBoard.vue'),
        },
        {
          path: '/tutors',
          children: [
            { path: '', name: 'tutors.index', component: () => import('@/views/tutors/index.vue')},
            { path: 'add', name: 'tutors.add', component: () => import('@/views/tutors/add.vue')},
            { path: ':id/edit', name: 'tutors.edit', component: () => import('@/views/tutors/edit.vue')},
            { path: ':id/edit', component: () => import('@/views/tutors/edit.vue')},
            { path: ':id/show', component: () => import('@/views/tutors/show.vue')},
          ]
        },

      {
          path: '/ongs',
          name: 'ongs',
          component: ListaOngs
        },
        {
          path: '/ongs/novo',
          name: 'nova-ong',
          component: NovaOng
        }


            ]
          },
          {
            path: '/about',
            component: { template: '<div>About</div>' }
          },
          {
            path: '/contact',
            component: { template: '<div>Contact</div>' }
          },

          {
        path: '/ongs/:id',
        name: 'detalhesOng',
        component: () => import('@/views/Ongs/DetalhesOng.vue')
      }


        ],
      })

export default router

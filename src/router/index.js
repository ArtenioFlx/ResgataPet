import { createRouter, createWebHistory } from 'vue-router'
import layoutDefault from '@/layouts/layoutDefault.vue'
import ListaOngs from '@/views/Ongs/ListaOngs.vue'
import NovaOng from '@/views/Ongs/NovaOng.vue'
import DetalhesOng from '@/views/Ongs/DetalhesOng.vue'
import SobreNos from '@/views/SobreNos.vue'
import MinhaConta from '@/views/MinhaConta.vue' // Importação Nova

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- Rotas de Autenticação ---
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/AuthLogin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/AuthRegister.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/Auth/AuthForgotPassword.vue')
    },

    // --- Rotas da Aplicação ---
    {
      path: '/',
      component: layoutDefault,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/dashBoard.vue'),
        },
        // Rota NOVA para a área do usuário
        {
          path: 'minha-conta',
          name: 'minha-conta',
          component: MinhaConta
        },
        {
          path: 'pets',
          name: 'Pets',
          component: () => import('@/views/Pet/PetsList.vue')
        },
        {
          path: 'pets/new',
          name: 'NewPet',
          component: () => import('@/views/Pet/NewPet.vue')
        },
        {
          path: 'pets/:id',
          name: 'PetDetail',
          component: () => import('@/views/Pet/PetDetail.vue')
        },
        {
          path: 'pets/:id/edit',
          name: 'EditPet',
          component: () => import('@/views/Pet/EditPet.vue')
        },
        {
          path: 'tutors',
          children: [
            {
              path: '',
              name: 'tutors.index',
              component: () => import('@/views/Tutors/TutorList.vue')
            },
            {
              path: 'add',
              name: 'tutors.add',
              component: () => import('@/views/Tutors/TutorAdd.vue')
            },
            {
              path: ':id/edit',
              name: 'tutors.edit',
              component: () => import('@/views/Tutors/TutorEdit.vue')
            },
            {
              path: ':id/show',
              name: 'tutors.show',
              component: () => import('@/views/Tutors/TutorShow.vue')
            },
          ]
        },
        {
          path: 'ongs',
          name: 'ongs',
          component: ListaOngs
        },
        {
          path: 'ongs/novo',
          name: 'nova-ong',
          component: NovaOng
        },
        {
          path: 'ongs/:id',
          name: 'detalhesOng',
          component: DetalhesOng
        },
        {
          path: 'about',
          name: 'about',
          component: SobreNos
        },
        {
          path: 'contact',
          name: 'contact',
          component: { template: '<div class="p-6 text-xl">Página de Contato</div>' }
        },
      ]
    },
  ]
})

export default router

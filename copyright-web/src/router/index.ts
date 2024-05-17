import { createRouter, createWebHistory } from 'vue-router'
import UploadFile from '../views/UploadFile.vue'
import UploadEncryptedFile from '../views/UploadEncryptedFile.vue'
import DownloadAndDecrypt from '@/views/DownloadAndDecrypt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'uploadFile',
      component: UploadFile
    },
    {
      path: '/uploadEncryptedFile',
      name: 'uploadEncryptedFile',
      component: UploadEncryptedFile
    },
    {
      path: '/downloadAndDecrypt',
      name: 'downloadAndDecrypt',
      component: DownloadAndDecrypt
    },
    {
      path: '/createNFT',
      name: 'createNFT',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateNFT.vue')
    },
  ]
})

export default router

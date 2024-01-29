import { createRouter, createWebHashHistory } from 'vue-router'
import SettingsView from '@/views/SettingsView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import LocationView from '@/views/LocationView.vue'
import GlobalScheduleView from '@/views/GlobalScheduleView.vue'
import ImportExoprtView from '@/views/ImportExportView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SettingsView
    },
    {
      path: '/location/:id',
      component: LocationView
    },
    {
      path: '/all',
      component: GlobalScheduleView
    },
    {
      path: '/export',
      component: ImportExoprtView
    },
    {
      path: '/schedule/:id',
      component: ScheduleView
    }
  ]
})

export default router

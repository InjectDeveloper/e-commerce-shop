import { createRouter, createWebHistory } from 'vue-router'

import webCatalog from '../components/pages/client/webCatalog.vue'
import webActivate from '../components/pages/client/webActivate.vue'
import webKey from '../components/pages/client/webKey.vue'
import webOrder from '../components/pages/client/webOrder.vue'
import webItemPage from '../components/pages/client/webItemPage.vue'
// admin
import webAdminLogin from '../components/pages/admin/webAdminLogin.vue'
import webAdmin from '../components/pages/admin/webAdmin.vue'
import webAdminItem from '../components/pages/admin/webAdminItem.vue'
import webAdminItemChange from '../components/pages/admin/webAdminItemChange.vue'
import webAdminContacts from '../components/pages/admin/webAdminContacts.vue'
import webAdminLicense from '../components/pages/admin/webAdminLicense.vue'
import webAdminLicenseGroup from '../components/pages/admin/webAdminLicenseGroup.vue'
import webAdminCodes from '../components/pages/admin/webAdminCodes.vue'
import webAdminChoiceLicense from '../components/pages/admin/webAdminChoiceLicense.vue'
import webAdminChoiceCreateLicense from '../components/pages/admin/webAdminChoiceCreateLicense.vue'
import webAdminRelations from '../components/pages/admin/webAdminRelations.vue'
import webAdminGroup from '../components/pages/admin/webAdminGroup.vue'

const routes = [
  {
    path: '/',
    name: 'webCatalog',
    component: webCatalog
  },
  {
    path: '/activate',
    name: 'webActivate',
    component: webActivate
  },
  {
    path: '/key/:code',
    name: 'webKey',
    component: webKey
  },
  {
    path: '/order/:orderData',
    name: 'webOrder',
    component: webOrder
  },
  {
    path: '/product/:productId',
    name: 'webItemPage',
    component: webItemPage
  },
  // admin
  {
    path: '/admin-login',
    name: 'webAdminLogin',
    component: webAdminLogin
  },
  {
    path: '/admin',
    name: 'webAdmin',
    component: webAdmin
  },
  {
    path: '/admin-item',
    name: 'webAdminItem',
    component: webAdminItem
  },
  {
    path: '/admin-item-change',
    name: 'webAdminItemChange',
    component: webAdminItemChange
  },
  {
    path: '/admin-contacts',
    name: 'webAdminContacts',
    component: webAdminContacts
  },
  {
    path: '/admin-choice-license',
    name: 'webAdminChoiceLicense',
    component: webAdminChoiceLicense
  },
  {
    path: '/admin-choice-create-license',
    name: 'webAdminChoiceCreateLicense',
    component: webAdminChoiceCreateLicense
  },
  {
    path: '/admin-license',
    name: 'webAdminLicense',
    component: webAdminLicense
  },
  {
    path: '/admin-license-group',
    name: 'webAdminLicenseGroup',
    component: webAdminLicenseGroup
  },
  {
    path: '/admin-codes',
    name: 'webAdminCodes',
    component: webAdminCodes
  },
  {
    path: '/admin-relations',
    name: 'webAdminRelations',
    component: webAdminRelations
  },
  {
    path: '/admin-group',
    name: 'webAdminGroup',
    component: webAdminGroup
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

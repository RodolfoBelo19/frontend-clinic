import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faSearch, faBell, faChevronDown, faEllipsisVertical, faChartSimple, faCopy, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('font-awesome-layers', FontAwesomeLayers)
  .mount('#app')

library.add(faPhone, faSearch, faBell, faChevronDown, faEllipsisVertical, faChartSimple, faCopy, faEdit, faTrash)

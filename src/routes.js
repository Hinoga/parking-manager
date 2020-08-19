import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import MonetizationOn from '@material-ui/icons/MonetizationOn'
// import Timeline from '@material-ui/icons/Timeline'

import UserPage from './views/User'
import BalancePage from './views/Balance'
import VehiculosPage from './views/Vehiculos'
import MensualidadPage from './views/Mensualidad'
import DashboardPage from './views/Dashboard/Dashboard.js'
// import PowerBI from './views/PowerBI/'

const dashboardRoutes = [
  {
    path: '/inicio',
    name: 'Inicio',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/clientes',
    name: 'Clientes',
    icon: Person,
    component: UserPage,
    layout: '/admin'
  },
  {
    path: '/mesualidad',
    name: 'Mensualidad',
    icon: MonetizationOn,
    component: MensualidadPage,
    layout: '/admin'
  },
  {
    path: '/vehiculos',
    name: 'Vehículos',
    icon: LocationOn,
    component: VehiculosPage,
    layout: '/admin'
  },
  {
    path: '/balances',
    name: 'Balances',
    icon: BubbleChart,
    component: BalancePage,
    layout: '/admin'
  }
  // {
  //   path: '/bi',
  //   name: 'Inteligencia de negocio',
  //   icon: Timeline,
  //   component: PowerBI,
  //   layout: '/admin'
  // }
]

export default dashboardRoutes

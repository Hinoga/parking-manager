import { getFullDateNow } from '../variables/utils'

export const userData = [
  {
    id: 10000,
    name: 'Luis',
    lastname: 'Benitez',
    address: 'Dosquebradas',
    mail: 'luisbenitez@gmail.com'
  },
  {
    id: 21212,
    name: 'Luis',
    lastname: 'Benitez',
    address: 'Dosquebradas',
    mail: 'luisbenitez@gmail.com'
  }
]

export const vehiculosData = [
  {
    id: 1,
    placa: 111,
    ciudad: 'Pereira',
    departamento: 'Risaralda',
    propietario: 'Luis',
    place: 2,
    date: getFullDateNow(),
    type: 'Carro'
  },
  {
    id: 2,
    placa: 1131,
    ciudad: 'Pereira',
    departamento: 'Risaralda',
    propietario: 'Luis',
    place: 3,
    date: getFullDateNow(),
    type: 'Carro'
  }
]

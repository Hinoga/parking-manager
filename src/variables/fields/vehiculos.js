import { getFullDateNow } from '../../variables/utils'
import { parkingDataSelect } from '../parkingData'
export default {
  placa: {
    elementLabel: 'Placa',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'placa',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true
    },
    valid: false,
    touched: false,
    error: null
  },
  ciudad: {
    elementLabel: 'Ciudad',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'city',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true
    },
    valid: false,
    touched: false,
    error: null
  },
  departamento: {
    elementLabel: 'Departamento',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'departamento',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true
    },
    valid: false,
    touched: false,
    error: null
  },
  propietario: {
    elementLabel: 'Propietario',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'propietario',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true
    },
    valid: false,
    touched: false,
    error: null
  },
  place: {
    elementLabel: 'Lugar',
    elementType: 'select',
    elementConfig: {
      name: 'place',
      options: parkingDataSelect
    },
    value: 'true',
    validation: {},
    valid: true,
    error: null
  },
  date: {
    elementLabel: 'Fecha y hora de ingreso',
    elementType: 'date-time',
    elementConfig: {
      type: 'date-time',
      name: 'date',
      required: true
    },
    value: getFullDateNow(),
    validation: {
      isText: true,
      required: true
    },
    valid: true,
    touched: true,
    error: null
  },
  type: {
    elementLabel: 'Tipo de vehículo',
    elementType: 'select',
    elementConfig: {
      name: 'type',
      options: [
        {
          label: 'Carro',
          value: 'Carro'
        },
        {
          label: 'Moto',
          value: 'Moto'
        }
      ]
    },
    value: 'Carro',
    validation: {},
    valid: true,
    error: null
  }
}

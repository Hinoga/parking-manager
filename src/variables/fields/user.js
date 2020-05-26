import { getFullDateNow } from '../../variables/utils'

export default {
  identification: {
    elementLabel: 'Identificación',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'id',
      required: true
    },
    value: '',
    validation: {
      isNumeric: true,
      required: true
    },
    valid: false,
    touched: false,
    error: null
  },
  name: {
    elementLabel: 'Nombre',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'name',
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
  lastname: {
    elementLabel: 'Apellido',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'lastname',
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
  mail: {
    elementLabel: 'Correo',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'mail',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false,
    error: null
  },
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
  address: {
    elementLabel: 'Dirección',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'address',
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
  date: {
    elementLabel: 'Fecha finalización de mensualidad',
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
  }
}

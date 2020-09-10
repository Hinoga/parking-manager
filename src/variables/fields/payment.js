import { getFullDateNow } from '../../variables/utils'

export default {
  date_start: {
    elementLabel: 'Fecha de inicio de la mensualidad',
    elementType: 'date-time',
    elementConfig: {
      type: 'date_start',
      name: 'date_start',
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
  date_end: {
    elementLabel: 'Fecha de finalización de la mensualidad',
    elementType: 'date-time',
    elementConfig: {
      type: 'date-time',
      name: 'date_end',
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
  amout: {
    elementLabel: 'Valor de la mensualidad',
    elementType: 'input',
    elementConfig: {
      type: 'number',
      name: 'amount',
      required: true
    },
    value: 0,
    validation: {
      isNumeric: true,
      required: true
    },
    valid: true,
    touched: true,
    error: null
  }
}

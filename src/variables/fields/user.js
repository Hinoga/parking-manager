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
  }
}

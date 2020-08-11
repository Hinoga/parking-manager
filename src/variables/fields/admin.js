export default {
  fullName: {
    elementLabel: 'Nombre completo',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      name: 'fullName',
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
  email: {
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
  phone: {
    elementLabel: 'Celular',
    elementType: 'input',
    elementConfig: {
      type: 'number',
      name: 'placa',
      required: true
    },
    value: '',
    validation: {
      isText: true,
      required: true,
      isNumeric: true
    },
    valid: false,
    touched: false,
    error: null
  }
}

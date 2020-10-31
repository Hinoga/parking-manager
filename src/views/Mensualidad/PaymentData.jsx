import React from 'react'
import _ from 'lodash'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button'
import ListInputs from '../../components/Input/ListInputs'

import paymentFields from '../../variables/fields/payment'
import useForm from '../../hooks/useForm'
import { useFirebase } from '../../context/firebase'
import { snackMessage } from '../../variables/alert/alerts'
import { getSpecificFullDate } from '../../variables/utils'

const PaymentData = props => {
  const { user, toggle } = props
  const firebase = useFirebase()
  const form = useForm(paymentFields)

  const handlerSubmit = ev => {
    ev.preventDefault()
    if (!_.isEmpty(user)) {
      let newPayments = {}
      let len = 0
      if (user.payments) {
        newPayments = user.payments
        len = Object.keys(user.payments).length
      }
      const newData = form.getJson()
      newData.date_start = getSpecificFullDate(newData.date_start)
      newData.date_end = getSpecificFullDate(newData.date_end)
      newPayments[len + 1]  = { ...newData, id: len+1 }
      firebase
        .clientData(user.id || user.uid)
        .update({
          hasActivePayment: true,
          payments:  newPayments
        })
        .then(_ => {
          snackMessage(
            'Felicidades!',
            'La mensualidad se creado exitosamente',
            'success'
          )
          form.onReset()
          toggle()
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar crear la mensualidad',
            'error'
          )
        })
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <GridContainer>
        <ListInputs inputs={form.onRender()} changed={form.onChanged} />
        <GridItem
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          <Button color='success' type='submit' disabled={!form.formIsValid}>
            Crear mensualidad
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default PaymentData

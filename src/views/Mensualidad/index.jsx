import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

import SearchUser from '../User/SearchUser'
import { snackMessage, questionMessage } from '../../variables/alert/alerts'
import { useFirebase } from '../../context/firebase'
import { useModal } from '../../hooks/useModal'

const useStyles = makeStyles(styles)

const Payment = () => {
  const classes = useStyles()
  const firebase = useFirebase()
  const paymentModal = useModal()
  const [paymentData, setPaymentData] = useState({})
  const [userSelected, setUserSelected] = useState({})
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (userId && userId !== userSelected.id) {
      firebase.clientData(userId).onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            const data = snapshot.data()
            const paymentsToSave =
              data.payments ? data.payments : {}
            delete data.payments
            setUserSelected({ ...data, id: snapshot.id })
            setPaymentData(paymentsToSave)
          }
        },
        error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar obtener los clientes',
            'error'
          )
        }
      )
    } else {
      setPaymentData([])
      setUserSelected({})
      setUserId(null)
    }
  }, [userId])

  const onRemove = (id, item, indx) => {
    questionMessage(
      'Cuidado',
      '¿Seguro que quieres eliminar esta mensualidad?',
      'warn',
      () => {
        const newPayments = Object.keys(paymentData).reduce(function(r, e) {
          if (id !== paymentData[e].id) r[e] = paymentData[e]
          return r;
        }, {})
        firebase
          .clientData(userSelected.id)
          .update({
            payments: newPayments
          })
          .then(_ => {
            snackMessage(
              'Felicidades!',
              'La mensualidad ha sido eliminada exitosamente',
              'success'
            )
          })
          .catch(error => {
            snackMessage(
              'Ups!',
              'Ha ocurrido un error al intentar eliminar la mensualidad',
              'error'
            )
          })
      }
    )
  }

  const formattedData = data => {
    let returnData = []
    console.log({data})
    _.mapValues(data, (value, key) => {
      returnData.push({...value})
    })
    return returnData
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <SearchUser
          setUserSelected={data =>
            data && data.id ? setUserId(data.id) : setUserId(null)
          }
          label='Buscar el Cliente'
        />
      </GridItem>
      {!_.isEmpty(userSelected) ? (
        <>
          <GridItem xs={12}>
            <Card>
              <CardHeader color='success'>
                <h4 className={classes.cardTitleWhite}>Mensualidad</h4>
                <p className={classes.cardCategoryWhite}>
                  El cliente {userSelected.name}
                  {userSelected.lastname} cuenta con una mensualidad:{''}
                  {userSelected.hasActivePayment ? 'ACTIVA' : 'INACTIVA'}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor='success'
                  tableHead={{
                    date_start: 'Fecha de inicio',
                    date_end: 'Fecha de finalización',
                    amout: 'Valor',
                    actions: 'Acciones'
                  }}
                  tableData={formattedData(paymentData)}
                  onRemove={onRemove}
                />
              </CardBody>
            </Card>
          </GridItem>
        </>
      ) : (
        <p className={classes.infoTitleDefault}>
          Primero busca y selecciona a un Cliente
        </p>
      )}
    </GridContainer>
  )
}

export default Payment

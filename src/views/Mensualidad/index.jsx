import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Modal from 'components/Modal/Modal.jsx'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

import SearchUser from '../User/SearchUser'
import { snackMessage, questionMessage } from '../../variables/alert/alerts'
import { useFirebase } from '../../context/firebase'
import { useModal } from '../../hooks/useModal'
import PaymentData from './PaymentData'

const useStyles = makeStyles(styles)

const Payment = () => {
  const classes = useStyles()
  const firebase = useFirebase()
  const paymentModal = useModal()
  const [paymentData, setPaymentData] = useState([])
  const [userSelected, setUserSelected] = useState({})
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (userId && userId !== userSelected.id) {
      firebase.clientData(userId).onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            const data = snapshot.data()
            const paymentsToSave =
              data.payments && data.payments.length ? data.payments : []
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

  const onRemove = (id, item) => {
    questionMessage(
      'Cuidado',
      '¿Seguro que quieres eliminar esta mensualidad?',
      'warn',
      () => {
        const newPayments = paymentData.filter(({ id }) => id !== item.id)
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

  return (
    <GridContainer>
      <Modal
        openModal={paymentModal.modalOpen}
        onToggleModal={() => paymentModal.toggle()}
        title='Mensualidad'
      >
        <PaymentData user={userSelected} toggle={paymentModal.toggle} />
      </Modal>
      <GridItem xs={12}>
        <SearchUser
          setUserSelected={data =>
            data && data.id ? setUserId(data.id) : setUserId(null)
          }
          label='Buscar el CLiente'
        />
      </GridItem>
      {!_.isEmpty(userSelected) ? (
        <>
          <GridItem
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button color='success' onClick={() => paymentModal.toggle()}>
              Agregar mensualidad nueva
            </Button>
          </GridItem>
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
                  tableData={paymentData}
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

import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MonetizationOn from '@material-ui/icons/MonetizationOn'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Modal from 'components/Modal/Modal.jsx'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Button from 'components/CustomButtons/Button.js'

import { snackMessage, questionMessage } from '../../variables/alert/alerts'
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'
import { useFirebase } from '../../context/firebase'
import UserDataPage from './UserData'
import { useModalWithData } from '../../hooks/useModal'
import PaymentData from 'views/Mensualidad/PaymentData'
const useStyles = makeStyles(styles)

export default function User() {
  const classes = useStyles()
  const firebase = useFirebase()
  const paymentModal = useModalWithData()
  const [modal, setModal] = useState(false)
  const [data, setData] = useState([])
  const [selected, setSelected] = useState({})

  useEffect(() => {
    firebase.clientsData().onSnapshot(
      snapshot => {
        if (snapshot.docs.length) {
          const clientsToSave = snapshot.docs.map(snap => ({
            id: snap.id,
            ...snap.data()
          }))
          setData(clientsToSave)
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
  }, [])

  const onRemove = (id, item) => {
    questionMessage(
      'Cuidado',
      '¿Seguro que quieres eliminar este cliente?',
      'warn',
      () => {
        firebase
          .clientData(item.id)
          .delete()
          .then(_ => {
            snackMessage(
              'Felicidades!',
              'El cliente ha sido eliminado exitosamente',
              'success'
            )
          })
          .catch(error => {
            snackMessage(
              'Ups!',
              'Ha ocurrido un error al intentar eliminar el cliente',
              'error'
            )
          })
      }
    )
  }

  const handleModal = (id, item) => {
    item && setSelected(item)
    modal && setSelected({})
    setModal(!modal)
  }

  return (
    <GridContainer>
      <Modal
        openModal={paymentModal.modal}
        onToggleModal={() => paymentModal.handleModal()}
        title='Mensualidad'
      >
        <PaymentData user={paymentModal.selected} toggle={paymentModal.handleModal} />
      </Modal>
      <Modal openModal={modal} onToggleModal={handleModal} title='Cliente'>
        <UserDataPage
          setData={setData}
          data={data}
          selected={selected}
          toggle={handleModal}
        />
      </Modal>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button color='success' onClick={handleModal}>
          Agregar Cliente
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='success'>
            <h4 className={classes.cardTitleWhite}>Clientes</h4>
            <p className={classes.cardCategoryWhite}>
              Clientes registrados en el parqueadero
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor='success'
              tableHead={{
                identification: 'Identificación',
                name: 'Nombre',
                lastname: 'Apellido',
                mail: 'Correo',
                placa: 'Placa',
                address: 'Dirección',
                ciudad: 'Ciudad',
                date: 'Fin de mensualidad',
                actions: 'Acciones'
              }}
              tableData={data}
              onEdit={handleModal}
              onRemove={onRemove}
              extraActions={[
                {
                  title: 'Generar mensualidad',
                  action: (_, data) => paymentModal.handleModal(data),
                  Component: () => <MonetizationOn />
                }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

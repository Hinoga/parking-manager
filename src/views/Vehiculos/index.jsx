import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Modal from 'components/Modal/Modal.jsx'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'
import Receipt from '@material-ui/icons/Receipt'

import ReceiptView from '../Receipt/Receipt'
import VehiculosDataPage from './VehiculosData'
import ParkingView from 'views/Parqueadero/ParkingView'
import { parkingData } from '../../variables/parkingData'
import { getTotalCost } from '../../variables/utils'
import { snackMessage, questionMessage } from '../../variables/alert/alerts'
import { useFirebase } from '../../context/firebase'
import { useModalWithData } from '../../hooks/useModal'

const useStyles = makeStyles(styles)

export default function Vehiculos() {
  const classes = useStyles()
  const firebase = useFirebase()
  const receiptModal = useModalWithData()
  const vehicleData = useModalWithData()
  const [data, setData] = useState([])
  const [parkingModal, setParkingModal] = useState(false)
  const [parkingPlaces, setParkingPlaces] = useState({ ...parkingData })

  useEffect(() => {
    firebase.vehiclesData().onSnapshot(
      snapshot => {
        if (snapshot.docs.length) {
          const vehiclesToSave = snapshot.docs.map(snap => ({
            id: snap.id,
            ...snap.data()
          }))
          let newParkingPlaces = { ...parkingPlaces }
          vehiclesToSave.map(({ place, placa }) => {
            newParkingPlaces[place] = {
              state: 1,
              name: placa
            }
          })
          setParkingPlaces(newParkingPlaces)
          setData(vehiclesToSave)
        }
      },
      error => {
        snackMessage(
          'Ups!',
          'Ha ocurrido un error al intentar obtener los vehiculos',
          'error'
        )
      }
    )
  }, [])

  const handleModal = (id, item) => {
    item && vehicleData.handleModal(item)
    vehicleData.handleModal()
  }

  const handleReceiptModal = (id, item, key) => {
    questionMessage('', '¿Quieres generar el recibo?', 'info', () => {
      firebase
        .vehicleData(item.id)
        .delete()
        .then(_ => {
          const newVehicleData = [...data.slice(0, key), ...data.slice(key + 1)]
          setData(newVehicleData)
          const { date, id: uid, ...rest } = item
          const receiptNewData = {
            ...rest,
            initialDate: date,
            ...getTotalCost(date, rest.type)
          }
          firebase
            .receiptData()
            .add({
              ...receiptNewData
            })
            .then(_ => {
              receiptModal.handleModal(receiptNewData)
              snackMessage(
                'Felicidades!',
                'El recibo se generó exitosamente',
                'success'
              )
            })
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar generar el recibo',
            'error'
          )
        })
    })
  }

  return (
    <GridContainer>
      <Modal
        openModal={vehicleData.modal}
        onToggleModal={vehicleData.handleModal}
        title='Vehiculo'
      >
        <VehiculosDataPage
          selected={vehicleData.selected}
          toggle={vehicleData.handleModal}
          setParkingPlaces={setParkingPlaces}
          parkingPlaces={parkingPlaces}
        />
      </Modal>
      <Modal
        openModal={receiptModal.modal}
        onToggleModal={() => receiptModal.handleModal()}
      >
        <ReceiptView selected={receiptModal.selected} />
      </Modal>
      <Modal
        openModal={parkingModal}
        onToggleModal={() => setParkingModal(!parkingModal)}
        title='Parqueadero'
      >
        <ParkingView parkingPlaces={parkingPlaces} />
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
          Agregar Ingreso
        </Button>
        <Button color='primary' onClick={() => setParkingModal(!parkingModal)}>
          Ver Parqueaderos
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='success'>
            <h4 className={classes.cardTitleWhite}>Vehículos</h4>
            <p className={classes.cardCategoryWhite}>
              Vehículos registrados en el parqueadero
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor='success'
              tableHead={{
                placa: 'Placa',
                ciudad: 'Cuidad',
                user: 'Usuario',
                place: 'N. parqueadero',
                date: 'Fecha de ingreso',
                type: 'Tipo de vehículo',
                actions: 'Acciones'
              }}
              tableData={data}
              onEdit={handleModal}
              extraActions={[
                {
                  title: 'Generar recibo',
                  action: handleReceiptModal,
                  Component: () => <Receipt />
                }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

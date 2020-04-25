import React, { useState } from 'react'

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

import { vehiculosData } from '../../variables/tableData'
import VehiculosDataPage from './VehiculosData'
import ParkingView from 'views/Parqueadero/ParkingView'
import { parkingData } from '../../variables/parkingData'

const useStyles = makeStyles(styles)

export default function Vehiculos() {
  const [data, setData] = useState(vehiculosData)
  const [modal, setModal] = useState(false)
  const [parkingModal, setParkingModal] = useState(false)
  const [parkingPlaces, setParkingPlaces] = useState({ ...parkingData })
  const [selected, setSelected] = useState({})
  const [idSelected, setIdSelected] = useState(null)
  const classes = useStyles()

  const onRemove = (id, item) => {
    let newData = data.filter(item => {
      if (item.id !== id) return item
    })
    let newParkingPlaces = { ...parkingPlaces }
    newParkingPlaces[item.place].state = 0
    setParkingPlaces(newParkingPlaces)
    setData(newData)
  }

  const handleModal = (id, item) => {
    item && setSelected(item)
    !isNaN(id) && setIdSelected(id)
    if (modal) {
      setSelected({})
      setIdSelected(null)
    }
    setModal(!modal)
  }

  return (
    <GridContainer>
      <Modal openModal={modal} onToggleModal={handleModal} title='Vehiculo'>
        <VehiculosDataPage
          setData={setData}
          data={data}
          selected={selected}
          toggle={handleModal}
          setParkingPlaces={setParkingPlaces}
          parkingPlaces={parkingPlaces}
        />
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
          Agregar vehículo
        </Button>
        <Button color='primary' onClick={() => setParkingModal(!parkingModal)}>
          Ver parqueaderos
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
                departamento: 'Departamento',
                propietario: 'Propietario',
                place: 'N. parqueadero',
                date: 'Fecha de ingreso',
                type: 'Tipo de vehículo',
                actions: 'Acciones'
              }}
              tableData={data}
              onRemove={onRemove}
              onEdit={handleModal}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

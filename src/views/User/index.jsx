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

import { userData } from '../../variables/tableData'
import UserDataPage from './UserData'

import { useFirebase } from '../../context/firebase'
import { useUser } from 'context/user'
const useStyles = makeStyles(styles)

export default function User() {
  const firebase = useFirebase()
  const [user] = useUser()

  // useEffect(() => {
  //   console.log('useEffect')
  //   firebase.clientsData(user.uid).onSnapshot(snapshot => {
  //     console.log('Snapshot', snapshot)
  //     if (snapshot.exists) {
  //       console.log(snapshot)
  //       const data = snapshot.data()
  //       console.log(data)
  //     }
  //   })
  // }, [])

  // useEffect(async () => {
  //   const result = await firebase.clientsData(user.uid).get()
  //   console.log(result);
  // });

  const [modal, setModal] = useState(false)
  const [data, setData] = useState(userData)
  const [selected, setSelected] = useState({})
  const [idSelected, setIdSelected] = useState(null)
  const classes = useStyles()

  const onRemove = (id, item) => {
    let newData = data.filter(item => {
      if (item.id !== id) return item
    })
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
      <Modal openModal={modal} onToggleModal={handleModal} title='Usuario'>
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
          Crear usuario
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='success'>
            <h4 className={classes.cardTitleWhite}>Usuarios</h4>
            <p className={classes.cardCategoryWhite}>
              Usuarios registrados en el parqueadero
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor='success'
              tableHead={{
                id: 'Identificación',
                name: 'Nombre',
                lastname: 'Apellido',
                address: 'Dirección',
                mail: 'Correo',
                actions: 'Acciones'
              }}
              tableData={data}
              onEdit={handleModal}
              onRemove={onRemove}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

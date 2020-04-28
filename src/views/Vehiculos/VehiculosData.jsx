import React, { useEffect } from 'react'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import ListInputs from '../../components/Input/ListInputs'
import vehiculosFields from '../../variables/fields/vehiculos'
import Button from '../../components/CustomButtons/Button'
import { useFirebase } from '../../context/firebase'
import { snackMessage } from '../../variables/alert/alerts'

import useForm from '../../hooks/useForm'
import { getSpecificFullDate } from '../../variables/utils'

const VehiculosData = props => {
  const firebase = useFirebase()
  const form = useForm(vehiculosFields)

  const {
    data,
    setData,
    selected,
    toggle,
    parkingPlaces,
    setParkingPlaces
  } = props

  useEffect(() => {
    Object.keys(selected).length && form.onLoad(selected)
    return () => form.onReset()
  }, [selected])

  const handlerSubmit = ev => {
    ev.preventDefault()
    const newData = form.getJson()
    newData.date = getSpecificFullDate(newData.date)
    if (Object.keys(selected).length) {
      firebase
        .vehicleData(selected.id)
        .update({
          ...newData
        })
        .then(_ => {
          snackMessage(
            'Felicidades!',
            'El vehiculo ha sido ingresado exitosamente',
            'success'
          )
          form.onReset()
          toggle()
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar editar el vehiculo',
            'error'
          )
        })
      let newParkingPlaces = { ...parkingPlaces }
      newParkingPlaces[selected.place].state = 0
      newParkingPlaces[newData.place].state = 1
      setParkingPlaces(newParkingPlaces)
    } else {
      firebase
        .vehiclesData()
        .add({
          ...newData
        })
        .then(_ => {
          snackMessage(
            'Felicidades!',
            'El usuario ha sido creado exitosamente',
            'success'
          )
          form.onReset()
          toggle()
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar crear el usuario',
            'error'
          )
        })
      let newParkingPlaces = { ...parkingPlaces }
      newParkingPlaces[newData.place].state = 1
      setParkingPlaces(newParkingPlaces)
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <GridContainer>
        <ListInputs inputs={form.onRender()} changed={form.onChanged} />
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          <Button color='success' type='submit' disabled={!form.formIsValid}>
            {selected ? 'Editar' : 'Crear'}
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default VehiculosData

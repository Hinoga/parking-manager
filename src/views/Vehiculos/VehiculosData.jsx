import React, { useEffect, useState, useCallback } from 'react'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import ListInputs from '../../components/Input/ListInputs'
import { fullInfo, basicInfo } from '../../variables/fields/vehiculos'
import Button from '../../components/CustomButtons/Button'
import { useFirebase } from '../../context/firebase'
import { snackMessage } from '../../variables/alert/alerts'

import useForm from '../../hooks/useForm'
import { getSpecificFullDate } from '../../variables/utils'
import SearchUser from '../User/SearchUser'
import NewVehicleType from './NewVehicleType'

const VehiculosData = props => {
  const { selected, toggle, parkingPlaces, setParkingPlaces } = props
  const firebase = useFirebase()
  const [isFullInfo, setIsFullInfo] = useState(true)
  const [userSelected, setUserSelected] = useState({})
  const fullForm = useForm(fullInfo)
  const basicForm = useForm(basicInfo)

  useEffect(() => {
    if (Object.keys(selected).length) {
      isFullInfo ? fullForm.onLoad(selected) : basicForm.onLoad(selected)
    }
    return () => {
      isFullInfo ? fullForm.onReset() : basicForm.onReset()
    }
  }, [selected])

  useEffect(() => {
    if (Object.keys(userSelected).length) {
      fullForm.onLoad(userSelected)
    }
  }, [userSelected])

  const handlerSubmit = ev => {
    ev.preventDefault()
    const newData = isFullInfo ? fullForm.getJson() : basicForm.getJson()
    newData.date = getSpecificFullDate(newData.date)
    if (Object.keys(userSelected).length) newData.user = userSelected.name
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
      newParkingPlaces[selected.place] = {
        state: 0,
        name: ''
      }
      newParkingPlaces[newData.place] = {
        state: 1,
        name: newData.placa
      }
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
            'El vehiculo ha sido ingresado exitosamente',
            'success'
          )
          toggle()
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar ingresar el vehiculo',
            'error'
          )
        })
      let newParkingPlaces = { ...parkingPlaces }
      newParkingPlaces[newData.place].state = 1
      setParkingPlaces(newParkingPlaces)
    }
  }

  const handleVehicleType = isFull => {
    setIsFullInfo(isFull)
    isFull ? basicForm.onReset() : fullForm.onReset()
  }

  return (
    <>
      <NewVehicleType
        handleVehicleType={handleVehicleType}
        isFullInfo={isFullInfo}
      />
      <form onSubmit={handlerSubmit}>
        <GridContainer>
          {isFullInfo && <SearchUser setUserSelected={setUserSelected} />}
          <ListInputs
            inputs={isFullInfo ? fullForm.onRender() : basicForm.onRender()}
            changed={isFullInfo ? fullForm.onChanged : basicForm.onChanged}
          />
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
            <Button
              color='success'
              type='submit'
              disabled={
                isFullInfo ? !fullForm.formIsValid : !basicForm.formIsValid
              }
            >
              {Object.keys(selected).length ? 'Editar' : 'Crear'}
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </>
  )
}

export default VehiculosData

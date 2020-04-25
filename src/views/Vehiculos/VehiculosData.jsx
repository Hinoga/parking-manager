import React, { useEffect } from 'react'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import ListInputs from '../../components/Input/ListInputs'
import vehiculosFields from '../../variables/fields/vehiculos'
import Button from '../../components/CustomButtons/Button'

import useForm from '../../hooks/useForm'
import { getSpecificFullDate } from '../../variables/utils'

const VehiculosData = props => {
  const {
    data,
    setData,
    selected,
    toggle,
    parkingPlaces,
    setParkingPlaces
  } = props
  const form = useForm(vehiculosFields)

  useEffect(() => {
    Object.keys(selected).length && form.onLoad(selected)
    return () => form.onReset()
  }, [selected])

  const handlerSubmit = ev => {
    ev.preventDefault()
    let dataUpdated = data
    const newData = form.getJson()
    newData.date = getSpecificFullDate(newData.date)
    if (Object.keys(selected).length) {
      let newParkingPlaces = { ...parkingPlaces }
      let index = data.findIndex(item => item.id == selected.id)
      dataUpdated = [...data.slice(0, index), newData, ...data.slice(index + 1)]
      newParkingPlaces[selected.place].state = 0
      newParkingPlaces[newData.place].state = 1
      setData(dataUpdated)
      setParkingPlaces(newParkingPlaces)
      toggle()
    } else {
      dataUpdated.unshift(newData)
      let newParkingPlaces = { ...parkingPlaces }
      newParkingPlaces[newData.place].state = 1
      setParkingPlaces(newParkingPlaces)
      setData(dataUpdated)
      form.onReset()
      toggle()
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

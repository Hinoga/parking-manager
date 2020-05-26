import React, { useEffect } from 'react'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button'
import ListInputs from '../../components/Input/ListInputs'

import userFields from '../../variables/fields/user'
import useForm from '../../hooks/useForm'
import { useFirebase } from '../../context/firebase'
import { snackMessage } from '../../variables/alert/alerts'
import { getFullDateNow } from '../../variables/utils'

const UserData = props => {
  const { selected, toggle } = props
  const firebase = useFirebase()
  const form = useForm(userFields)

  useEffect(() => {
    Object.keys(selected).length && form.onLoad(selected)
    return () => form.onReset()
  }, [selected])

  const handlerSubmit = ev => {
    ev.preventDefault()
    const newData = form.getJson()
    if (Object.keys(selected).length) {
      firebase
        .clientData(selected.id)
        .update({
          ...newData
        })
        .then(_ => {
          snackMessage(
            'Felicidades!',
            'El usuario ha sido editado exitosamente',
            'success'
          )
          form.onReset()
          toggle()
        })
        .catch(error => {
          snackMessage(
            'Ups!',
            'Ha ocurrido un error al intentar editar el usuario',
            'error'
          )
        })
    } else {
      firebase
        .clientsData()
        .add({
          ...newData,
          created: getFullDateNow()
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
            {Object.keys(selected).length ? 'Editar' : 'Crear'}
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default UserData

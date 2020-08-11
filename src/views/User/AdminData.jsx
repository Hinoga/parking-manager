import React, { useEffect } from 'react'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button'
import ListInputs from '../../components/Input/ListInputs'

import userFields from '../../variables/fields/admin'
import useForm from '../../hooks/useForm'

const AdminData = props => {
  const { selected, handleSubmit } = props
  const form = useForm(userFields)

  useEffect(() => {
    Object.keys(selected).length && form.onLoad(selected)
    return () => form.onReset()
  }, [selected])

  const handlerSubmit = ev => {
    ev.preventDefault()
    const newData = form.getJson()
    handleSubmit(newData)
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
            Editar
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default AdminData

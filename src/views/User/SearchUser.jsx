import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useFirebase } from '../../context/firebase'

import { snackMessage } from '../../variables/alert/alerts'

const SearchUser = ({ setUserSelected }) => {
  const firebase = useFirebase()
  const [data, setData] = useState([])
  const [input, setInput] = useState(null)

  useEffect(() => {
    firebase.clientsData().onSnapshot(
      snapshot => {
        if (snapshot.docs.length) {
          const clientsToSave = snapshot.docs.map(snap => {
            let client = { ...snap.data() }
            return {
              id: snap.id,
              name: `${client.name} ${client.lastname}`,
              placa: client.placa,
              ciudad: client.ciudad
            }
          })
          setData(clientsToSave)
        }
      },
      error => {
        snackMessage(
          'Ups!',
          'Ha ocurrido un error al intentar obtener los usuarios',
          'error'
        )
      }
    )
  }, [])

  const handleOnChange = (ev, value) => {
    setInput(value)
    setUserSelected && setUserSelected(value)
  }

  return (
    <Autocomplete
      value={input}
      options={data}
      getOptionLabel={item => item.name}
      onChange={handleOnChange}
      style={{
        width: '100%',
        padding: '0px 5px 0 15px',
        margin: '20px 10px 0px 0px'
      }}
      renderInput={params => (
        <TextField {...params} label='Usuario' variant='outlined' />
      )}
    />
  )
}

export default SearchUser

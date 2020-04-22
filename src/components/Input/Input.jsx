import React from 'react'
import MomentUtils from '@date-io/moment'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const InputCustom = ({
  elementType,
  elementConfig,
  helperText,
  error,
  ...props
}) => {
  let inputElement = null
  switch (elementType) {
    case 'input':
      inputElement = (
        <TextField
          {...elementConfig}
          {...props}
          variant='outlined'
          autoComplete='none'
          helperText={helperText}
          error={error}
        />
      )

      break

    case 'textarea':
      inputElement = (
        <TextField
          {...elementConfig}
          {...props}
          helperText={helperText}
          error={error}
          multiline
          variant='outlined'
          autoComplete='none'
        />
      )
      break
    case 'select':
      inputElement = (
        <TextField {...elementConfig} {...props} select variant='outlined'>
          {elementConfig.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )
      break
    case 'date-time':
      inputElement = (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            {...elementConfig}
            {...props}
            inputVariant='outlined'
            format='YYYY-MM-DD, hh:mm a'
          />
        </MuiPickersUtilsProvider>
      )
      break
    default:
      inputElement = <input {...elementConfig} {...props} autoComplete='none' />
  }

  return (
    <FormControl style={{ width: '100%', margin: '20px 10px 0px 0px' }}>
      {inputElement}
    </FormControl>
  )
}

export default InputCustom

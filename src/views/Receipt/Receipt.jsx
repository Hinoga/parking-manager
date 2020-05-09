import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { numToCurrency } from '../../variables/utils'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

const Review = ({ selected }) => {
  const classes = useStyles()

  return (
    <List disablePadding>
      <ListItem className={classes.listItem}>
        <ListItemText primary={'Placa'} />
        <Typography variant='body2'>{selected.placa}</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary={'Tipo de vehiculo:'} />
        <Typography variant='body2'>{selected.type}</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary={'Fecha y hora de ingreso'} />
        <Typography variant='body2'>{selected.initialDate}</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary={'Fecha y hora de salida'} />
        <Typography variant='body2'>{selected.finalDate}</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary={`Duración:`} />
        <Typography variant='body2'>
          {selected.totalHrs} {selected.totalHrs === 1 ? 'Hora' : 'Horas'}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary='Total a pagar:' />
        <Typography variant='subtitle1' className={classes.total}>
          {numToCurrency(selected.cost)}
        </Typography>
      </ListItem>
    </List>
  )
}

export default Review

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const numToCurrency = number => {
  let n = number ? number : 0
  return new Intl.NumberFormat('co-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(n)
}

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

const Review = props => {
  const classes = useStyles()

  return (
    <List disablePadding>
      <ListItem className={classes.listItem} key={'name'}>
        <ListItemText primary={'Placa'} secondary={'XRZ-184'} />
        <ListItemText primary={`Duración:`} secondary={'5hr y 35m'} />
        <Typography variant='body2'>{numToCurrency(24300)}</Typography>
      </ListItem>

      <ListItem className={classes.listItem}>
        <ListItemText primary='IVA:' />
        <Typography variant='subtitle1' className={classes.total}>
          {numToCurrency(700)}
        </Typography>
      </ListItem>

      <ListItem className={classes.listItem}>
        <ListItemText primary='Total con IVA:' />
        <Typography variant='subtitle1' className={classes.total}>
          {numToCurrency(25000)}
        </Typography>
      </ListItem>
    </List>
  )
}

export default Review

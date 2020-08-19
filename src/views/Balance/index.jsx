import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ChartistGraph from 'react-chartist'

import { makeStyles } from '@material-ui/core/styles'

import AccessTime from '@material-ui/icons/AccessTime'

import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from 'variables/charts.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'
import { useFirebase } from '../../context/firebase'
import {
  getLastWeekDates,
  getRangeDateItems,
  getActualYearDates
} from '../../variables/utils'
const useStyles = makeStyles(styles)

export default function Balance() {
  const firebase = useFirebase()
  const [userData, setUserData] = useState([])
  const [vehicleData, setVehicleData] = useState([])

  useEffect(() => {
    firebase.receiptData().onSnapshot(snapshot => {
      if (snapshot.docs.length) {
        const vehiclesToSave = snapshot.docs.map(snap => ({
          id: snap.id,
          ...snap.data()
        }))
        setVehicleData(vehiclesToSave)
      }
    })
    firebase.clientsData().onSnapshot(snapshot => {
      if (snapshot.docs.length) {
        const clientsToSave = snapshot.docs.map(snap => ({
          id: snap.id,
          ...snap.data()
        }))
        setUserData(clientsToSave)
      }
    })
  }, [])

  const getUsersByWeek = data => {
    if (userData.length) {
      const lastWeekDate = getLastWeekDates()
      getRangeDateItems({
        data: userData,
        itemProperty: 'created',
        start: lastWeekDate.start,
        end: lastWeekDate.end
      }).map(item => {
        const date = moment(item.created)
        data.series[0][date.day() - 1]++
      })
    }
    return data
  }

  const getUsersByMonth = data => {
    if (userData.length) {
      const lastYearDates = getActualYearDates()
      getRangeDateItems({
        data: userData,
        itemProperty: 'created',
        start: lastYearDates.start,
        end: lastYearDates.end
      }).map(item => {
        const date = moment(item.created)
        data.series[0][date.month()]++
      })
    }
    return data
  }

  const getVehiclesByDay = data => {
    if (vehicleData.length) {
      const lastYearDates = getActualYearDates()
      getRangeDateItems({
        data: vehicleData,
        itemProperty: 'initialDate',
        start: lastYearDates.start,
        end: lastYearDates.end
      }).map(item => {
        const date = moment(item.initialDate)
        data.series[0][date.month()]++
      })
    }
    return data
  }

  const classes = useStyles()
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color='danger'>
              <ChartistGraph
                className='ct-chart'
                data={getVehiclesByDay(completedTasksChart.data)}
                type='Line'
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Vehiculos ingresados</h4>
              <p className={classes.cardCategory}>
                Cantidad de vehiculos recibidos en lo que va del año
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Última actualización: Hace unos instantes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color='success'>
              <ChartistGraph
                className='ct-chart'
                data={getUsersByWeek(dailySalesChart.data)}
                type='Line'
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Clientes por semana</h4>
              <p className={classes.cardCategory}>
                Cantidad de clientes ingresados entre {getLastWeekDates().start}{' '}
                y {getLastWeekDates().end}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Última actualización: Hace unos instantes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={getUsersByMonth(emailsSubscriptionChart.data)}
                type='Bar'
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Clientes mensuales</h4>
              <p className={classes.cardCategory}>
                Cantidad de clientes registrados por mes
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Última actualización: Hace unos instantes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

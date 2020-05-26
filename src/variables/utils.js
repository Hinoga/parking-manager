import moment from 'moment'
import 'moment/locale/es'

//Variables del precio de los vehiculos
const carro = 1500
const moto = 600

export const getDateNow = () => moment().format('YYYY-MM-DD')

export const getSpecificDate = date => moment(date).format('YYYY-MM-DD')

export const getFullDateNow = _ => moment().format('YYYY-MM-DD, hh:mm a')

export const getSpecificFullDate = date =>
  moment(date).format('YYYY-MM-DD, hh:mm a')

export const getTimeAgo = date => moment(date).fromNow()

export const getLastWeekDates = _ => {
  return {
    start: moment()
      .subtract(1, 'weeks')
      .startOf('week')
      .format('YYYY-MM-DD'),
    end: moment()
      .subtract(1, 'weeks')
      .endOf('week')
      .format('YYYY-MM-DD')
  }
}

export const getActualYearDates = _ => {
  return {
    start: moment()
      .startOf('year')
      .format('YYYY-MM-DD'),
    end: moment()
      .endOf('year')
      .format('YYYY-MM-DD')
  }
}

export const getTotalCost = (initial, type) => {
  const finalDate = getFullDateNow()
  const duration = moment.duration(moment().diff(moment(initial)))
  const totalHrs = Math.ceil(duration.asHours())
  const cost = type === 'Carro' ? totalHrs * carro : totalHrs * moto
  return {
    finalDate: finalDate,
    totalHrs: totalHrs,
    cost: cost
  }
}

export const numToCurrency = number => {
  let n = number ? number : 0
  return new Intl.NumberFormat('co-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(n)
}

export const getRangeDateItems = ({ data, itemProperty, start, end }) => {
  const result = data.filter(
    item => item[itemProperty] >= start && item[itemProperty] <= end
  )
  return result
}

import {
  successCardHeader,
  whiteColor
} from 'assets/jss/material-dashboard-react.js'

const modalStyle = {
  dialogTitle: {
    textAlign: 'center',
    flex: '0 0 auto',
    margin: 0,
    padding: '24px 24px 20px',
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...successCardHeader
    }
  },
  dialogTitleText: {
    color: 'white'
  }
}

export default modalStyle

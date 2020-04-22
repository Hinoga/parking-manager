import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import DialogContent from '@material-ui/core/DialogContent'
import Fade from '@material-ui/core/Fade'

import modalStyle from 'assets/jss/material-dashboard-react/components/modalStyle.js'

const Modal = ({
  openModal,
  onToggleModal,
  children,
  width,
  title,
  classes
}) => (
  <Dialog
    TransitionComponent={Fade}
    maxWidth={width}
    fullWidth
    open={openModal}
    onClose={onToggleModal}
    transitionDuration={200}
  >
    {title && (
      <div className={classes.dialogTitle}>
        <Typography
          variant='h6'
          align='center'
          className={classes.dialogTitleText}
        >
          {title}
        </Typography>
      </div>
    )}
    <DialogContent>{children}</DialogContent>
  </Dialog>
)

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string
}

Modal.defaultProps = {
  width: 'sm'
}

export default withStyles(modalStyle)(Modal)

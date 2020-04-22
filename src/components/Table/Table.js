import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import Edit from '@material-ui/icons/Edit'
import Close from '@material-ui/icons/Close'

import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js'

const useStyles = makeStyles(styles)

export default function CustomTable(props) {
  const classes = useStyles()
  const { tableHead, tableData, tableHeaderColor, onEdit, onRemove } = props
  let tableHeadLength = tableHead.length
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return tableHeadLength === key + 1 ? (
                  <>
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key}
                    ></TableCell>
                  </>
                ) : (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((data, key) => {
            let tableLength = data.length
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {data.map((prop, key) => {
                  return tableLength === key + 1 ? (
                    <>
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                      <TableCell className={classes.tableActions}>
                        <Tooltip
                          id='tooltip-top'
                          title='Edit Task'
                          placement='top'
                          classes={{ tooltip: classes.tooltip }}
                          onClick={() => onEdit(data[0])}
                        >
                          <IconButton
                            aria-label='Edit'
                            className={classes.tableActionButton}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon +
                                ' ' +
                                classes.edit
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          id='tooltip-top-start'
                          title='Remove'
                          placement='top'
                          classes={{ tooltip: classes.tooltip }}
                          onClick={() => onRemove(data[0], data)}
                        >
                          <IconButton
                            aria-label='Close'
                            className={classes.tableActionButton}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon +
                                ' ' +
                                classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </>
                  ) : (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

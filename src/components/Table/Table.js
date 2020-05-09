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
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    onEdit,
    onRemove,
    extraActions
  } = props
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {Object.keys(tableHead).map(key => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {tableHead[key]}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((data, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {Object.keys(tableHead).map(prop => {
                  return prop === 'actions' ? (
                    <>
                      <TableCell className={classes.tableActions}>
                        {onEdit && (
                          <Tooltip
                            id='tooltip-top'
                            title='Editar'
                            placement='top'
                            classes={{ tooltip: classes.tooltip }}
                            onClick={() => onEdit(data.id, data, key)}
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
                        )}
                        {onRemove && (
                          <Tooltip
                            id='tooltip-top-start'
                            title='Eliminar'
                            placement='top'
                            classes={{ tooltip: classes.tooltip }}
                            onClick={() => onRemove(data.id, data, key)}
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
                        )}
                        {extraActions &&
                          extraActions.map(item => {
                            return (
                              <Tooltip
                                id={item.title}
                                title={item.title}
                                placement='top'
                                classes={{ tooltip: classes.tooltip }}
                                onClick={() => item.action(data.id, data, key)}
                              >
                                <IconButton
                                  aria-label={item.title}
                                  className={classes.tableActionButton}
                                >
                                  <item.Component
                                    className={classes.tableActionButtonIcon}
                                  />
                                </IconButton>
                              </Tooltip>
                            )
                          })}
                      </TableCell>
                    </>
                  ) : (
                    <TableCell className={classes.tableCell} key={prop}>
                      {data[prop] && data[prop]}
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

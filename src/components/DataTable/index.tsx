import * as React from 'react'
import jp from 'jsonpath'
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TablePagination
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'


export type columnSchema = {
  title: string,
  field: string,
  align?: boolean,
  sort?: boolean,
  editable?: boolean,
  editEvent?: "doubleclick" | "button",
  type: 'string' | 'number'
}

type props = {
  rows: Array<any>,
  columns: Array<columnSchema>,
  checks?: boolean,
  actions?: Array<any>,
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>, row?: any) => void,
  setRowValue?: (newRowsValue: any) => void
}

type state = {
  rows: Array<any>,
  selectAllCheck: boolean,
  page: number,
  rowsPerPage: number,
  editMode: boolean,
}

const initState: state = {
  rows: [],
  selectAllCheck: false,
  page: 0,
  rowsPerPage: 5,
  editMode: false
}

export default function DataTable(props: props) {

  const [state, setState] = React.useState(initState)

  React.useEffect(() => {
    loadData()
  }, [props.rows])

  function loadData() {
    setState({
      ...state,
      rows: props.rows.map(element => {
        return {
          ...element,
          modify: false,
          check: false
        }
      })
    })
  }

  function submit() {
    if (props.setRowValue) {
      props.setRowValue(state.rows)
    }
  }

  function handleRow(action: 'modify' | 'check' | 'all', value: boolean, row?: any) {
    const newRows = state.rows

    switch (action) {
      case 'modify':
        for (const r of newRows) {
          if (r.id === row.id) {
            r.modify = value
            r.check = !props.checks ? true : r.check
            break
          }
        }
        break
      case 'check':
        for (const r of newRows) {
          if (r.id === row.id) {
            r.check = value
            break
          }
        }
        break

      case 'all':
        newRows.forEach(r => {
          r.modify = true
          r.check = true
          return
        })
        break
      default:
        break
    }

    setState({
      ...state,
      rows: newRows
    })
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, row: any) {
    const { id, value, type } = event.target

    setState({
      ...state,
      rows: state.rows.map(element => {
        if (element.id === row.id) {
          return {
            ...element,
            [id]: type === 'number' ? Number(value) : value
          }
        } else {
          return element
        }
      })
    })
  }

  function onSetValues(row: any) {
    handleRow('modify', false, row)
    submit()
  }

  function onCancelValues(row: any, fieldId: string, columnType: string) {
    setState({
      ...state,
      rows: state.rows.map(element => {
        if (element.id === row.id) {
          return {
            ...element,
            modify: false,
            [fieldId]: columnType === 'number' ? 0 : ''
          }
        } else {
          return element
        }
      })
    })
  }

  function onAdd(row: any, fieldId: string, value: number,) {
    setState({
      ...state,
      rows: state.rows.map(element => {
        if (element.id === row.id) {
          return {
            ...element,
            [fieldId]: element[fieldId] + value
          }
        } else {
          return element
        }
      })
    })
  }

  function onSelect(event: React.ChangeEvent<HTMLInputElement>, row = []) {

    if (event.target.id === 'selectAllCheck') {

      const newRows = state.rows.map(element => {
        return {
          ...element,
          check: event.target.checked
        }
      })

      setState({
        ...state,
        rows: newRows,
        selectAllCheck: event.target.checked
      })
    } else {
      handleRow('check', event.target.checked, row)
      handleRow('modify', true, row)
    }

    submit()
  }

  function handleChangePage(event: unknown, newPage: number) {
    setState({
      ...state,
      page: newPage
    })
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    })
  }

  function resolvePath (row: any, path:string) {
    const resolved = jp.query(row, path)[0]
    if (resolved === undefined) return ''
    return resolved
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {
                props.checks ?
                  (
                    <TableCell padding='checkbox'>
                      <Checkbox
                        id="selectAllCheck"
                        color='primary'
                        checked={state.selectAllCheck}
                        onChange={(e) => onSelect(e)}
                      />
                    </TableCell>
                  ) : ''
              }
              {
                props.columns.map((column) => (
                  <TableCell align={column.align ? 'right' : 'left'} key={column.title} ><b>{column.title}</b></TableCell>
                ))
              }
              {
                props.actions ?
                  (
                    <TableCell align='right' ><b>Acciones</b></TableCell>
                  ) : ''
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              state.rows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  {
                    props.checks ?
                      (
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={row.check}
                            onChange={(e) => onSelect(e)}
                          />
                        </TableCell>
                      ) : ''
                  }
                  {
                    props.columns.map((column) => (
                      <TableCell
                        onDoubleClick={() => handleRow('modify', true, row)}
                        align={column.align ? 'right' : 'left'}
                        key={row.id}
                      >
                        {
                          row.modify && row.check && column.editable ?
                            (
                              <FormControl variant='filled' fullWidth>
                                <InputLabel htmlFor={`${column.field}`}>{column.title}</InputLabel>
                                <OutlinedInput
                                  id={`${column.field}`}
                                  type={column.type}
                                  value={resolvePath(row, column.field)}
                                  onChange={(e) => onChange(e, row)}
                                  endAdornment={
                                    <InputAdornment position='end'>
                                      {
                                        column.type === 'number' ?
                                          (
                                            <React.Fragment>
                                              <IconButton
                                                title="Restar"
                                                onClick={() => onAdd(row, `${column.field}`, -1)}
                                                edge='end'
                                                color="error"
                                                sx={{ marginRight: 1 }}
                                              >
                                                <RemoveIcon />
                                              </IconButton>
                                              <IconButton
                                                title='Sumar'
                                                onClick={() => onAdd(row, `${column.field}`, 1)}
                                                edge='end'
                                                color="primary"
                                                sx={{ marginRight: 3 }}
                                              >
                                                <AddIcon />
                                              </IconButton>
                                            </React.Fragment>
                                          ) : ''
                                      }
                                      <IconButton
                                        title='Guardar'
                                        onClick={() => onSetValues(row)}
                                        edge='end'
                                        color="success"
                                        sx={{ marginRight: 1 }}
                                      >
                                        <CheckCircleOutlineIcon />
                                      </IconButton>
                                      <IconButton
                                        title='Cancelar'
                                        onClick={() => onCancelValues(row, `${column.field}`, column.type)}
                                        edge='end'
                                        color="error"
                                      >
                                        <HighlightOffIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label='Cantidad'
                                />
                              </FormControl>
                            )
                            :
                            resolvePath(row, column.field)
                        }
                      </TableCell>
                    ))
                  }
                  {
                    props.actions ?
                    (
                      <TableCell align='right'>
                        {
                          props.actions.map((action) => (
                            <IconButton
                              key={action.title}
                              title={action.title}
                              onClick={() => action.function()}
                              edge='end'
                              color="success"
                              sx={{ marginRight: 1 }}
                            >
                              {action.icon}
                            </IconButton>
                          ))
                        }
                      </TableCell>
                    ) : ''
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.rows.length}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Elementos por página"
      />
    </React.Fragment>
  )
}

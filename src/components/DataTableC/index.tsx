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
  editEvent?: 'doubleclick' | 'button',
  type: 'string' | 'number'
}

type props = {
  rows: Array<any>,
  columns: Array<columnSchema>,
  checks?: boolean,
  actions?: Array<any>,
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>, row?: any) => void
}

type State = {
  page: number,
  rowsPerPage: number,
  editMode: boolean,
  selectAllCheck: boolean
}

const initState: State = {
  page: 0,
  rowsPerPage: 5,
  editMode: false,
  selectAllCheck: false
}

export default function DataTable(props: props) {

  const [state, setState] = React.useState<State>(initState)

  function onSelect(event: React.ChangeEvent<HTMLInputElement>, row = {}) {
    const { id, checked } = event.target

    if (id === 'selectAllCheck') {
      console.log(id)
      setState({
        ...state,
        selectAllCheck: checked
      })
    }

    if (props.onSelect !== undefined) {
      props.onSelect(event, row)
    }

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

  function resolvePath(row: any, path: string) {
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
                        id='selectAllCheck'
                        name='selectAllCheck'
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
              props.rows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  {
                    props.checks ?
                      (
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            value={row.code}
                            checked={row.checked}
                            onChange={(e) => onSelect(e, row)}
                          />
                        </TableCell>
                      ) : ''
                  }
                  {
                    props.columns.map((column) => (
                      <TableCell
                        // onDoubleClick={() => handleRow('modify', true, row)}
                        align={column.align ? 'right' : 'left'}
                        key={row.id}
                      >
                        {
                          row.modify && row.checked && column.editable ?
                            (
                              <FormControl variant='filled' fullWidth>
                                <InputLabel htmlFor={`${column.field}`}>{column.title}</InputLabel>
                                <OutlinedInput
                                  id={`${column.field}`}
                                  type={column.type}
                                  value={resolvePath(row, column.field)}
                                  // onChange={(e) => onChange(e, row)}
                                  endAdornment={
                                    <InputAdornment position='end'>
                                      {
                                        column.type === 'number' ?
                                          (
                                            <React.Fragment>
                                              <IconButton
                                                title='Restar'
                                                // onClick={() => onAdd(row, `${column.field}`, -1)}
                                                edge='end'
                                                color='error'
                                                sx={{ marginRight: 1 }}
                                              >
                                                <RemoveIcon />
                                              </IconButton>
                                              <IconButton
                                                title='Sumar'
                                                // onClick={() => onAdd(row, `${column.field}`, 1)}
                                                edge='end'
                                                color='primary'
                                                sx={{ marginRight: 3 }}
                                              >
                                                <AddIcon />
                                              </IconButton>
                                            </React.Fragment>
                                          ) : ''
                                      }
                                      <IconButton
                                        title='Guardar'
                                        // onClick={() => onSetValues(row)}
                                        edge='end'
                                        color='success'
                                        sx={{ marginRight: 1 }}
                                      >
                                        <CheckCircleOutlineIcon />
                                      </IconButton>
                                      <IconButton
                                        title='Cancelar'
                                        // onClick={() => onCancelValues(row, `${column.field}`, column.type)}
                                        edge='end'
                                        color='error'
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
                                color='success'
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
        component='div'
        count={props.rows.length}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Elementos por página'
      />
    </React.Fragment>
  )
}

import * as React from 'react'
import { Modal, Card, CardContent, Grid, TextField, Button, CardHeader, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Menu } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Container } from '@mui/system'
import DataTable, { columnSchema } from '../../../../../../components/DataTable'
import { Account } from '../../../../../../schemas/Provider/provider.schema'

type Props = {
  open: boolean,
  handleModal: (id: string) => void,
  addAccount: (account: Account) => void,
  banks: any[]
}

type State = {
  showPaymentAccountForm: boolean,
  anchorEl: null | HTMLElement,
  form: Account
}

const initState : State = {
  showPaymentAccountForm: true,
  anchorEl: null,
  form: {
    bank: {
      code: '',
      description: ''
    },
    number: 0,
    cvu: '',
    alias: ''
  }
}

const columns: Array<columnSchema> = [
  {
    title: 'Banco',
    field: 'bank',
    type: 'string'
  },
  {
    title: 'Álias',
    field: 'alias',
    type: 'string'
  },
  {
    title: 'Número de cuenta',
    field: 'accountNumber',
    type: 'string',
    align: true
  },
  {
    title: 'CBU ó CVU',
    field: 'cbuOrCvu',
    type: 'string',
    align: true
  }
]

const rows = [
  {
    bank: 'Comafi',
    accountNumber: '24587777888',
    cbuOrCvu: '7897654657894654',
    alias: 'REMO.PALA.ARROZ'
  },
  {
    bank: 'Santander',
    accountNumber: '546546888',
    cbuOrCvu: '7897654657894654',
    alias: 'REMO.PALA.ARROZ'
  }
]

export default function PaymentAccountModal(props: Props) {

  const [state, setState] = React.useState<State>(initState)

  const open = Boolean(state.anchorEl)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setState({
      ...state,
      anchorEl: event.currentTarget
    })
  }

  function handleClose() {
    setState({
      ...state,
      anchorEl: null
    })
  }

  function handleForm() {
    setState({
      ...state,
      anchorEl: null,
      showPaymentAccountForm: !state.showPaymentAccountForm
    })
  }

  function handleChangeL1(row: { code: string, description: string }) {
    setState({
      ...state,
      form: {
        ...state.form,
        bank: row
      }
    })
  }

  function handleChangeL2(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { id, value } = event.target
    setState({
      ...state,
      form: {
        ...state.form,
        [id]: value
      }
    })
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.handleModal('payment')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container style={{ marginTop: '20px' }}>
          <Card>
            <CardHeader
              title="Cuenta de pago"
              subheader="Ingrese la información de la cuenta bancaria del proveedor, esta información será útil al momento de hacer un pago"
              action={
                <React.Fragment>
                  <IconButton aria-label="settings" onClick={(e) => handleClick(e)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={state.anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleForm}>{state.showPaymentAccountForm ? "Ocultar formulario" : "Agregar"}</MenuItem>
                  </Menu>
                </React.Fragment>
              }
            />
            <CardContent>
              <Box sx={state.showPaymentAccountForm ? {} : { display: 'none' }}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='bankName'>Banco</InputLabel>
                      <Select
                        id='bankName'
                        variant='outlined'
                      >
                        {
                          props.banks.map(bank => (
                            <MenuItem
                              key={bank.code}
                              value={bank.code}
                              onClick={() => handleChangeL1(bank)}
                            >
                              {bank.description}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      id="number"
                      value={state.form.number}
                      onChange={(e) => handleChangeL2(e)}
                      label='Número de cuenta'
                      placeholder='Número de cuenta'
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      id="cvu"
                      value={state.form.cvu}
                      onChange={(e) => handleChangeL2(e)}
                      label='CVU'
                      placeholder='CVU de la cuenta'
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      id="alias"
                      value={state.form.alias}
                      onChange={(e) => handleChangeL2(e)}
                      label='Alias'
                      placeholder='Alias de la cuenta'
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12}
                    item
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      style={{ marginLeft: '4px' }}
                      onClick={() => props.addAccount(state.form)}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Grid xs={12} sm={12} item>
                <DataTable rows={rows} columns={columns} />
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </div>
  )
}

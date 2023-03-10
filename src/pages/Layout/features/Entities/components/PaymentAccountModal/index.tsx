import * as React from 'react';
import { Modal, Card, CardContent, Grid, TextField, Button, CardHeader, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Menu, SelectChangeEvent } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from '@mui/system';
import DataTable, { columnSchema } from '../../../../../../components/DataTable';

type props = {
  open: boolean,
  handleModal: (id: string) => void
}

type state = {
  showPaymentAccountForm: boolean,
  anchorEl: null | HTMLElement,
  form: {
    accountType: number
  }
}

const initState = {
  showPaymentAccountForm: true,
  anchorEl: null,
  form: {
    accountType: 1
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
    type: 'number',
    align: true
  },
  {
    title: 'CBU ó CVU',
    field: 'cbuOrCvu',
    type: 'number',
    align: true
  }
];

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
];

export default function AccountModal(props: props) {

  const [state, setState] = React.useState<state>(initState);

  const open = Boolean(state.anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const handleForm = () => {
    setState({
      ...state,
      anchorEl: null,
      showPaymentAccountForm: !state.showPaymentAccountForm
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>) => {
    const { name, value } = event.target;

    setState({
      ...state,
      form: {
        ...state.form,
        [name]: value
      }
    });
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
              title="Cuentas"
              subheader="Ingrese la información de las cuentas de la entidad"
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
                      <InputLabel htmlFor='accountType'>Tipo de cuenta</InputLabel>
                      <Select
                        name="accountType"
                        variant='outlined'
                        value={state.form.accountType}
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Cuenta bancaria</MenuItem>
                        <MenuItem value={2}>Cuenta en efectivo (caja)</MenuItem>
                        <MenuItem value={3}>Cuenta en billetera virtual</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {
                    state.form.accountType === 1 ?
                      (
                        <React.Fragment>
                          <Grid xs={12} sm={6} item>
                            <FormControl fullWidth>
                              <InputLabel htmlFor='accountName'>Banco</InputLabel>
                              <Select
                                id='accountName'
                                variant='outlined'
                              >
                                <MenuItem value={1}>Comafi</MenuItem>
                                <MenuItem value={2}>Galicia</MenuItem>
                                <MenuItem value={3}>ICBC</MenuItem>
                                <MenuItem value={4}>Santander</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField
                              label='Número de cuenta'
                              placeholder='Número de cuenta'
                              variant='outlined'
                              fullWidth
                            />
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField
                              label='CVU'
                              placeholder='CVU de la cuenta'
                              variant='outlined'
                              fullWidth
                            />
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField
                              label='Alias'
                              placeholder='Alias de la cuenta'
                              variant='outlined'
                              fullWidth
                            />
                          </Grid>
                        </React.Fragment>
                      )
                      : state.form.accountType === 2 ?
                        (
                          <React.Fragment>
                            <Grid xs={12} sm={6} item>
                              <FormControl fullWidth>
                                <InputLabel htmlFor='accountName'>Tipo de caja</InputLabel>
                                <Select
                                  id='accountName'
                                  variant='outlined'
                                >
                                  <MenuItem value={1}>Caja mayor</MenuItem>
                                  <MenuItem value={2}>Caja menor</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6} item>
                              <TextField
                                label='Alias'
                                placeholder='Alias de la cuenta'
                                variant='outlined'
                                fullWidth
                              />
                            </Grid>
                          </React.Fragment>
                        ) : state.form.accountType === 3 ?
                          (
                            <React.Fragment>
                              <Grid xs={12} sm={6} item>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='accountName'>Billetera virtual</InputLabel>
                                  <Select
                                    id='accountName'
                                    variant='outlined'
                                  >
                                    <MenuItem value={1}>Mercado pago</MenuItem>
                                    <MenuItem value={2}>Modo</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid xs={12} sm={6} item>
                                <TextField
                                  label='Número de cuenta'
                                  placeholder='Número de cuenta'
                                  variant='outlined'
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={12} sm={6} item>
                                <TextField
                                  label='CVU'
                                  placeholder='CVU de la cuenta'
                                  variant='outlined'
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={12} sm={6} item>
                                <TextField
                                  label='Alias'
                                  placeholder='Alias de la cuenta'
                                  variant='outlined'
                                  fullWidth
                                />
                              </Grid>
                            </React.Fragment>
                          ) : ''
                  }
                  <Grid xs={12} sm={12}
                    item
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                    <Button variant='contained' color='primary' style={{ marginLeft: '4px' }}>Guardar</Button>
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
  );
}

import React, { useState } from 'react'
import { Card, CardContent, FormControl, Grid, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import AccountModal from '../PaymentAccountModal'

type state = {
  modal: {
    product: boolean,
    payment: boolean
  }
}

const initState: state = {
  modal: {
    product: false,
    payment: false
  }
}

/*
    Razon social,
    Nombre de fantasia,
    CUIT,
    ingresos brutos (numero de identificacion de impuesto)
    condicion ante el iva
    Cuentas bancarias con saldo incial
    caja mayor y caja menor saldo incial
    datos de contacto: mail y whatsapp
*/

export default function RegisterForm() {
  const [state, setState] = useState<state>(initState);
  const [render, setRender] = useState(false);

  function handleModal(id: string) {
    const newState: state = state;

    switch (id) {
      case 'product':
        newState.modal.product = !newState.modal.product;
        break;

      case 'payment':
        newState.modal.payment = !newState.modal.payment;
        break;

      default:
        break;
    }

    setState(newState);

    setRender(!render);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <TextField
                label='Razón social'
                placeholder='Razón social'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label='Nombre de fantasía'
                placeholder='Nombre de fantasía'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label='CUIT'
                placeholder='Documento CUIT'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label='Número de impuesto a ingresos brutos'
                placeholder='Número de impuesto a ingresos brutos'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='ivaCondition'>Condición ante el IVA</InputLabel>
                <Select
                  id='ivaCondition'
                  variant='outlined'
                >
                  <MenuItem value={1}>Responsable inscripto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label='Whatsapp'
                placeholder='Whatsapp'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label='Dirección de correo electrónico'
                placeholder='Dirección de correo electrónico'
                variant='outlined'
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label='Dirección'
                placeholder='Dirección'
                variant='outlined'
                fullWidth
                required
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
                variant='outlined'
                color='success'
                startIcon={<AddCardIcon />}
                onClick={() => handleModal('payment')}
              >
                Cuentas
              </Button>
              <Button
                sx={{ marginLeft: '4px' }}
                variant='outlined'
                color='primary'
                startIcon={<DataSaverOnIcon />}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AccountModal open={state.modal.payment} handleModal={handleModal} />
    </div>
  )
}

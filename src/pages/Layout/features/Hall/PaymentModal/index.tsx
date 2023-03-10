import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';
import DataTable, { columnSchema } from '../../../../../components/DataTable';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AddCardIcon from '@mui/icons-material/AddCard';
import { utils } from '../utils';

type Props = {
  open: boolean,
  handleModal: (show: boolean, modalId: string) => void,
  products: Array<any>
}

type Discount = {
  id: string,
  description: string,
  type: string,
  value: number
}

const columns: Array<columnSchema> = [
  {
    title: 'Producto',
    field: 'product',
    type: 'string'
  },
  {
    title: 'Cantidad',
    field: 'quantity',
    type: 'number',
    align: true,
  },
  {
    title: 'Precio',
    field: 'price',
    type: 'number',
    align: true,
  },
];

type State = {
  wayPay: string,
  billType: string,
  cuit: string,
  availableDiscounts: Discount[],
  discount: string,
  selectedDiscount?: Discount,
  diners: number,
  razonSocial: string,
  condicionIva: string,
  nombreFantasia: string,
  dividedAccount: boolean,
  total: number
}

const initState: State = {
  wayPay: '',
  billType: '',
  availableDiscounts: [
    {
      id: '1',
      description: 'Amigos (10%)',
      type: 'percent',
      value: 10
    },
    {
      id: '2',
      description: 'Empleados (10%)',
      type: 'percent',
      value: 10
    },
    {
      id: '3',
      description: 'Santi (30%)',
      type: 'percent',
      value: 30
    },
  ],
  discount: '0',
  diners: 2,
  cuit: '',
  razonSocial: '',
  condicionIva: '',
  nombreFantasia: '',
  dividedAccount: false,
  total: 850
}

export default function PaymentModal(props: Props) {

  const [state, setState] = React.useState<State>(initState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  }

  function onSelectDiscount(event: SelectChangeEvent<string>) {
    const { value } = event.target;
    if (value !== '0') {
      const discount = state.availableDiscounts.find(discount => discount.id === value);
      const discountValue = discount ? discount.value : 0;
      const billTotal = utils.sum(props.products, 'price');

      setState({
        ...state,
        discount: value,
        selectedDiscount: discount,
        total: (billTotal - (billTotal * (discountValue / 100)))
      });
    } else {
      setState({
        ...state,
        discount: value,
        selectedDiscount: undefined,
        total: utils.sum(props.products, 'price')
      });
    }
  }

  function onValidateDocument() {
    setState({
      ...state,
      razonSocial: 'Fabricas del norte SA',
      condicionIva: 'Responsable inscripto',
      nombreFantasia: 'Fabrica de muebles el sur'
    });
  }

  function onDividedAccount() {
    setState({
      ...state,
      dividedAccount: !state.dividedAccount
    });
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.handleModal(false, 'showPaymentModal')}
      >
        <Container style={{ marginTop: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
          <Card>
            <CardHeader
              title='Módulo de pago'
              subheader='Proporcione los datos de pago'
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    sx={{
                      display: 'block',
                    }}
                    control={
                      <Switch
                        checked={state.dividedAccount}
                        onChange={onDividedAccount}
                        name="Dividir cuenta"
                        color="primary"
                      />
                    }
                    label="Dividir cuenta"
                  />
                </Grid>
                {
                  state.dividedAccount ?
                    (
                      <React.Fragment>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            id='diners'
                            name='diners'
                            value={state.diners}
                            label='Cantidad de pagos'
                            placeholder='Cantidad de pagos'
                            variant='outlined'
                            fullWidth
                            type='number'
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor='wayPay'>Tipo de división</InputLabel>
                            <Select
                              id='wayPay'
                              name='wayPay'
                              variant='outlined'
                              onChange={(e) => handleChange(e)}
                            >
                              <MenuItem value={'1'}>Por partes iguales</MenuItem>
                              <MenuItem value={'2'}>Por productos</MenuItem>
                              <MenuItem value={'3'}>por Porcentaje</MenuItem>
                              <MenuItem value={'4'}>Por monto</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor='discount'>Descuento</InputLabel>
                            <Select
                              id='discount'
                              name='discount'
                              variant='outlined'
                              value={state.discount}
                              onChange={(e) => onSelectDiscount(e)}
                            >
                              <MenuItem value={'0'}>Ninguno</MenuItem>
                              {
                                state.availableDiscounts.map(discount => (
                                  <MenuItem key={discount.id} value={discount.id}>{discount.description}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography variant='subtitle1'>Información para pago 1 de {state.diners}</Typography>
                        </Grid>
                      </React.Fragment>
                    ) : ''
                }
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='wayPay'>Forma de pago</InputLabel>
                    <Select
                      id='wayPay'
                      name='wayPay'
                      variant='outlined'
                      onChange={(e) => handleChange(e)}
                      value={state.wayPay}
                    >
                      <MenuItem value={'1'}>Efectivo</MenuItem>
                      <MenuItem value={'2'}>Tarjeta débito</MenuItem>
                      <MenuItem value={'3'}>Tarjeta crédito</MenuItem>
                      <MenuItem value={'4'}>Mercado pago</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={state.dividedAccount ? 6 : 3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='billType'>Tipo de factura</InputLabel>
                    <Select
                      id='billType'
                      name='billType'
                      variant='outlined'
                      onChange={(e) => handleChange(e)}
                      value={state.billType}
                    >
                      <MenuItem value={'1'}>Comprobante de pago</MenuItem>
                      <MenuItem value={'2'}>Tipo A</MenuItem>
                      <MenuItem value={'3'}>Tipo C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {
                  !state.dividedAccount ?
                    (
                      <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='discount'>Descuento</InputLabel>
                          <Select
                            id='discount'
                            name='discount'
                            variant='outlined'
                            value={state.discount}
                            onChange={(e) => onSelectDiscount(e)}
                          >
                            <MenuItem value={'0'}>Ninguno</MenuItem>
                            {
                              state.availableDiscounts.map(discount => (
                                <MenuItem key={discount.id} value={discount.id}>{discount.description}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : ''
                }
                {
                  state.billType === '2' ?
                    (
                      <React.Fragment>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor='cuit'>CUIT/CUIL</InputLabel>
                            <OutlinedInput
                              id='cuit'
                              name='cuit'
                              value={state.cuit}
                              onChange={(e) => handleChange(e)}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    title="Validar documento"
                                    onClick={onValidateDocument}
                                    edge='end'
                                    color="success"
                                    sx={{ marginRight: 1 }}
                                    disabled={state.cuit === '' ? true : false}
                                  >
                                    <FactCheckIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id='razonSocial'
                            name='razonSocial'
                            value={state.razonSocial}
                            label='Razón social'
                            placeholder='Razón social'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id='nombreFantasia'
                            name='nombreFantasia'
                            value={state.nombreFantasia}
                            label='Nombre de fantasía'
                            placeholder='Nombre de fantasía'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id='condicionIva'
                            name='condicionIva'
                            value={state.condicionIva}
                            label='Condición ante el IVA'
                            placeholder='IVA'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                      </React.Fragment>
                    ) : ''
                }
                <Grid item xs={12} sm={12} >
                  <DataTable rows={props.products} columns={columns} />
                  <Typography variant='subtitle2' >Total productos - $ 552.00</Typography>
                  <Typography variant='caption' >Iva 21% - $ 102.00</Typography> <br />
                  {
                    state.selectedDiscount ?
                      (
                        <Typography variant='caption' >Descuento - {state.selectedDiscount.description}</Typography>
                      ) : ''
                  }
                  <Divider />
                  <Typography variant='h6' >Total - ${state.total}</Typography>
                </Grid>
                <Grid
                  item
                  md={12}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <IconButton color="primary" title="Cobrar">
                    <AddCardIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </div>
  )
}

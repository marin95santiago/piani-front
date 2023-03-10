import React, { useState } from 'react'
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import AddCardIcon from '@mui/icons-material/AddCard'
import SellIcon from '@mui/icons-material/Sell'
import PaymentAccountModal from '../PaymentAccountModal'
import ProductModal from '../../../../components/ProductModal'
import { columnSchema } from '../../../../../../components/DataTable'
import { ProductsByCategory } from '../../../../../../schemas/Product/product.schema'
import { Provider, Account } from '../../../../../../schemas/Provider/provider.schema'


interface State {
  modal: {
    product: boolean
    payment: boolean
  }
  form: Provider
  productsByCategory?: ProductsByCategory[]
  selectedProducts?: string[]
}

const initState: State = {
  modal: {
    product: false,
    payment: false
  },
  form: {
    businessName: '',
    name: '',
    cuit: '',
    phone: '',
    email: '',
    wayPay: {
      code: '',
      description: ''
    },
    observations: '',
    products: ['']
  }
}

const banks = [
  {
    code: '001',
    description: 'Banco Galicia'
  },
  {
    code: '002',
    description: 'Banco ICBC'
  },
  {
    code: '003',
    description: 'Banco Santander'
  }
]

const wayPays = [
  {
    code: 'FP-001',
    description: 'Pago de contado'
  },
  {
    code: 'FP-002',
    description: 'Cuenta corriente'
  }
]

const data = [
  {
    category: {
      code: '1',
      description: 'Lácteos'
    },
    products: [
      {
        code: 'PR-LE-001',
        description: 'Leche',
        brand: 'La serenísima',
        checked: true
      },
      {
        code: 'PR-LE-002',
        description: 'Leche descre',
        brand: 'La serenísima'
      },
      {
        code: 'PR-LE-003',
        description: 'Leche entera',
        brand: 'La serenísima'
      }
    ]
  },
  {
    category: {
      code: '2',
      description: 'Harinas'
    },
    products: [
      {
        code: 'HR-HR-001',
        description: 'Harina 000',
        brand: 'La harinera'
      }
    ]
  },
  {
    category: {
      code: '3',
      description: 'Papelería'
    },
    products: [
      {
        code: 'PA-PA-001',
        description: 'Papel blanco',
        brand: 'Resma'
      }
    ]
  }
]

const columns: Array<columnSchema> = [
  {
    title: 'Producto',
    field: 'description',
    type: 'string'
  },
  {
    title: 'Marca',
    field: 'brand',
    type: 'string'
  },
  {
    title: 'Código',
    field: 'code',
    type: 'string'
  }
]

export default function RegisterForm() {
  const [state, setState] = useState<State>(initState);

  React.useEffect(() => {
    async function loadData() {
      setState({
        ...state,
        productsByCategory: data
      })
    }

    loadData()
  }, [])

  function handleModal(id: string) {
    switch (id) {
      case 'product':
        setState({
          ...state,
          modal: {
            ...state.modal,
            product: !state.modal.product
          }
        })
        break;

      case 'payment':
        setState({
          ...state,
          modal: {
            ...state.modal,
            payment: !state.modal.payment
          }
        })
        break;

      default:
        break;
    }
  }

  function handleChangeL1(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { id, value } = event.target
    setState({
      ...state,
      form: {
        ...state.form,
        [id]: value
      }
    })
  }

  function handleChangeL2(id: string, row: { code: string, description: string }) {
    setState({
      ...state,
      form: {
        ...state.form,
        [id]: row
      }
    })
  }

  function onSelectProduct(event: React.ChangeEvent<HTMLInputElement>, row?: any) {
    const { checked } = event.target
    let selectedProducts = state.selectedProducts || []
    if (checked) {
      selectedProducts.push(row.code)
    } else {
      selectedProducts = selectedProducts.filter(product => product !== row.code)
    }
    setState({
      ...state,
      selectedProducts,
      productsByCategory: state.productsByCategory ?
        state.productsByCategory.map(category => {
        category.products.forEach(product => {
          if (product.code === row.code) {
            product.checked = checked
          }
        })
        return category
        }) : []
    })
  }

  function addAccount(account: Account) {
    const newAccounts = state.form.accounts || []
    newAccounts.push(account)
    setState({
      ...state,
      form: {
        ...state.form,
        accounts: newAccounts
      }
    })
  }

  function submit() {
    const form = state.form
    form.products = state.selectedProducts || ['']

    console.log(state)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <TextField
                id='businessName'
                value={state.form.businessName}
                label='Razón social'
                placeholder='Razón social'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                id='name'
                value={state.form.name}
                label='Nombre de fantasía'
                placeholder='Nombre de fantasía'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='cuit'
                value={state.form.cuit}
                label='CUIT'
                placeholder='Documento CUIT'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='phone'
                value={state.form.phone}
                label='Teléfono'
                placeholder='Telefono de contacto'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='email'
                value={state.form.email}
                label='Email'
                placeholder='Email'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                type='email'
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='wayPay'>Forma de pago preestablecida</InputLabel>
                <Select
                  id='wayPay'
                  value={state.form.wayPay.code}
                  variant='outlined'
                >
                  {
                    wayPays.map(wayPay => (
                      <MenuItem
                        key={wayPay.code}
                        value={wayPay.code}
                        onClick={() => handleChangeL2('wayPay', wayPay)}
                      >
                        {wayPay.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                id='observations'
                value={state.form.observations}
                label='Detalles'
                placeholder='Detalles'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                multiline
                rows={4}
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
                color='secondary'
                startIcon={<SellIcon />}
                onClick={() => handleModal('product')}
              >
                Productos
              </Button>
              <Button
                sx={{ marginLeft: '4px' }}
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
                onClick={submit}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProductModal
        open={state.modal.product}
        handleModal={handleModal}
        data={state.productsByCategory || []}
        columns={columns}
        onSelectProduct={onSelectProduct}
      />
      <PaymentAccountModal
        open={state.modal.payment}
        handleModal={handleModal}
        banks={banks}
        addAccount={addAccount}
      />
    </div>
  )
}

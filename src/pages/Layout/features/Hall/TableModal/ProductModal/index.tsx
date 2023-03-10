import * as React from 'react'
import { Container, Button, Card, CardContent, CardHeader, Grid, Modal, Tabs, Tab, Typography } from '@mui/material'
import DataTable, { columnSchema } from '../../../../../../components/DataTable'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import { Box } from '@mui/system'
import Service from '../../../../../../services/Product'

type props = {
  open: boolean,
  handleModal: () => void,
  onAddProducts: (products: Array<any>) => void
}

type state = {
  columns: Array<columnSchema>,
  rows: Array<any> | undefined
}

const initState: state = {
  columns: [{
    title: '',
    field: '',
    type: 'string'
  }],
  rows: []
}

const columns: Array<columnSchema> = [
  {
    title: 'Producto',
    field: 'description',
    type: 'string'
  },
  {
    title: 'Rubro',
    field: 'category',
    type: 'string'
  },
  {
    title: 'Precio',
    field: 'price',
    type: 'number'
  },
  {
    title: 'Cantidad (Doble click para agregar cantidad)',
    field: 'quantity',
    align: true,
    editable: true,
    type: 'number'
  }
]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ProductModal(props: props) {

  const [state, setState] = React.useState<state>(initState)
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  React.useEffect(() => {
    setStateProperties()
  }, [])

  function setStateProperties() {
    const products = Service.GetProducts('deProduccion')
    setState({
      ...state,
      columns: columns,
      rows: products.data?.map(row => {
        return {
          ...row,
          check: false,
          quantity: 0
        }
      }),
    })
  }

  function onChange(newRowsValue: any) {
    setState({
      ...state,
      rows: newRowsValue
    })
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.handleModal()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Container style={{ marginTop: '25px' }}>
          <Card>
            <CardHeader
              title='Productos'
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Cafetería" {...a11yProps(0)} />
                        <Tab label="Pastelería" {...a11yProps(1)} />
                        <Tab label="Pizzería" {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <DataTable
                        columns={columns}
                        rows={state.rows ? state.rows : []}
                        checks={true}
                        setRowValue={onChange}
                      />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <DataTable
                        columns={columns}
                        rows={state.rows ? state.rows : []}
                        checks={true}
                        setRowValue={onChange}
                      />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <DataTable
                        columns={columns}
                        rows={state.rows ? state.rows : []}
                        checks={true}
                        setRowValue={onChange}
                      />
                    </TabPanel>
                  </Box>
                </Grid>
                <Grid xs={12} sm={12}
                  item
                  container
                  direction='row'
                  justifyContent='flex-end'
                  alignItems='flex-start'
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<DataSaverOnIcon />}
                    onClick={() => props.onAddProducts(state.rows ? state.rows : [])}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </div>
  )
}

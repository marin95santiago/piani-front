import * as React from 'react'
import { Container, Button, Card, CardContent, CardHeader, Grid, Modal, Tabs, Tab, Typography } from '@mui/material'
// import DataTable, { columnSchema } from '../../../../components/DataTable'
import DataTable, { columnSchema } from '../../../../components/DataTableC'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import { Box } from '@mui/system'

type props = {
  open: boolean,
  data: any[],
  columns: Array<columnSchema>,
  handleModal: (id: string) => void,
  onSelectProduct: (event: React.ChangeEvent<HTMLInputElement>, row?: any) => void
}

interface State {
  selectedProducts: any[]
}

const initState: State = {
  selectedProducts: ['']
}

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

  const [state, setState] = React.useState<State>(initState)
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
  }, [])

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue)
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.handleModal('product')}
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
                        {
                          props.data.map((element, index) => (
                            <Tab key={element.category.code} label={element.category.description} {...a11yProps(index)} />
                          ))
                        }
                      </Tabs>
                    </Box>
                    {
                      props.data.map((element, index) => (
                        <TabPanel value={value} index={index}>
                          <DataTable
                            columns={props.columns}
                            rows={element.products}
                            checks={true}
                            onSelect={props.onSelectProduct}
                          />
                        </TabPanel>
                      ))
                    }
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
                    onClick={() => props.handleModal('product')}
                  >
                    Aceptar
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

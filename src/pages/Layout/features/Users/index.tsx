import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import RegisterForm from './components/RegisterForm'
import { Container, Divider } from '@mui/material'
import DataTable, { columnSchema } from '../../../../components/DataTable'
import UserContext from '../../../../contexts/User'
import { UserContextType } from '../../../../schemas/User'
import UserService from '../../../../services/User'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { validatePermission } from '../../../../utils/utils'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface State {
  value: number
  rows: Array<any>
}

const initialState : State = {
  value: 0,
  rows: []
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

const columns: Array<columnSchema> = [
  {
    title: 'Documento',
    field: 'dni',
    type: 'number'
  },
  {
    title: 'Usuario',
    field: 'username',
    type: 'string'
  },
  {
    title: 'Estado',
    field: 'state.description',
    type: 'string'
  }
]

export default function Users() {
  const [state, setState] = React.useState<State>(initialState)

  const { userContext } = React.useContext(
    UserContext
  ) as UserContextType

  React.useEffect(() => {
    async function loadData () {
      try {
        const token = userContext.token || ''
        const userService = new UserService()
        const users = await userService.getUsers(token)
        if (users instanceof Array) {
          setState({
            ...state,
            rows: users 
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [])
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({
      ...state,
      value: newValue
    })
  }

  function onEdit () {
    console.log('VA A EDITAR')
  }

  const actions = [
    {
      title: 'Editar',
      icon: <ModeEditIcon/>,
      function: onEdit
    }
  ]

  return (
    <Container fixed>
      <Typography
        variant='h4'
      >
        Usuarios
      </Typography>
      <Divider sx={{ mb: '2rem' }} />

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={state.value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Listado" {...a11yProps(0)} />
            <Tab label="Nuevo" {...a11yProps(1)} />
            <Tab label="Reportes" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={state.value} index={0}>
          {
            validatePermission('user_edit', userContext.permissions, true) ?
              (
                <DataTable rows={state.rows} columns={columns} actions={actions} />
              )
            :
              (
                <DataTable rows={state.rows} columns={columns}/>
              )
          }
        </TabPanel>
        <TabPanel value={state.value} index={1}>
          <RegisterForm />
        </TabPanel>
        <TabPanel value={state.value} index={2}>
          Reportes
        </TabPanel>
      </Box>
    </Container>
  )
}

import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Card, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import PermissionModal from '../PermissionModal'
import PositionService from '../../../../../../services/Position'
import UserContext from '../../../../../../contexts/User'
import { UserContextType } from '../../../../../../schemas/User'
import { Position } from '../../../../../../schemas/Position/position.schema'
import { ServerError } from '../../../../../../schemas/Error/error.schema'
import userMapper, { addressMapper } from '../../../../../../mappers/User/user.mapper'
import UserService from '../../../../../../services/User'


type state = {
  modal: {
    permissionModal: boolean,
  },
  positions: Position[]
  form: any
}

const initState: state = {
  modal: {
    permissionModal: false,
  },
  positions: [],
  form: {
    username: '',
    name: '',
    lastname: '',
    dni: 0,
    cuil: '',
    birthday: '',
    street: '',
    number: 0,
    floor: '',
    department: '',
    province: {
      code: '',
      description: ''
    },
    country: {
      code: '',
      description: ''
    },
    position: {
      code: '',
      description: ''
    },
    startDate: '',
    phone: 0,
    email: '',
    state: {
      code: '',
      description: '',
    },
    permissions: []
  }
}

const provinces = [
  {
    code: '01',
    description: 'Ciudad Autónoma de Buenos Aires'
  }
]

const countries = [
  {
    code: '01',
    description: 'Argentina'
  }
]

const states = [
  {
    code: '01',
    description: 'Activo'
  },
  {
    code: '02',
    description: 'Inactivo'
  }
]

export default function RegisterForm() {
  const [state, setState] = useState<state>(initState)

  const { userContext } = React.useContext(
    UserContext
  ) as UserContextType

  React.useEffect(() => {
    async function loadData () {
      const token = userContext.token || ''
      const positionService = new PositionService()
      try {
        const positions = await positionService.getPositions(token)
        setState({
          ...state,
          positions
        })
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ServerError>
          if (serverError && serverError.response) {
            return toast.error(serverError.response.data.message)
          }
        }
      }
    }
  
    loadData()
  }, [])

  function handleModal(id: string) {
    switch (id) {
      case 'permissionModal':
        setState({
          ...state,
          modal: {
            ...state.modal,
            permissionModal: !state.modal.permissionModal
          }
        })
        break

      default:
        break
    }
  }

  function handleChangeL1(event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
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

  function onAddPermissions(selectedPermissions: string[]) {
    setState({
      ...state,
      form: {
        ...state.form,
        permissions: selectedPermissions
      }
    })
  }

  async function onSave() {
    const token = userContext.token || ''
    state.form.address = addressMapper(state.form)
    const user = userMapper(state.form)
    try {
      const userService = new UserService()
      await userService.saveUser(user, token)
      toast.success('Usuario creado correctamente')
    } catch (error) {
      if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<ServerError>
        if (serverError && serverError.response) {
          return toast.error(serverError.response.data.message)
        }
			}
    }
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <TextField
                id='username'
                value={state.form.username}
                label='Nombre de usuario'
                placeholder='Nombre de usuario'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='dni'
                value={state.form.dni}
                type='number'
                label='DNI'
                placeholder='DNI'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='cuil'
                value={state.form.cuil}
                label='CUIL'
                placeholder='CUIL'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='name'
                value={state.form.name}
                label='Nombre'
                placeholder='Nombre'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='lastname'
                value={state.form.lastname}
                label='Apellido'
                placeholder='Apellido'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <InputLabel htmlFor='birthday'>Fecha de nacimiento</InputLabel>
              <TextField
                id='birthday'
                value={state.form.birthday}
                variant='standard'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
                type='date'
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                id='street'
                value={state.form.street}
                label='Calle'
                placeholder='Calle'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={6} sm={4} item>
              <TextField
                id='number'
                value={state.form.number}
                type='number'
                label='Altura'
                placeholder='Altura'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={6} sm={4} item>
              <TextField
                id='floor'
                value={state.form.floor}
                label='Piso'
                placeholder='Piso'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
            </Grid>
            <Grid xs={6} sm={4} item>
              <TextField
                id='department'
                value={state.form.department}
                label='Departamento'
                placeholder='Departamento'
                onChange={(e) => handleChangeL1(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='province'>Provincia</InputLabel>
                <Select
                  id='province'
                  value={state.form.province.code}
                  variant='outlined'
                >
                  {
                    provinces.map(province => (
                      <MenuItem
                        key={province.code}
                        value={province.code}
                        onClick={() => handleChangeL2('province', province)}
                      >
                        {province.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='country'>País</InputLabel>
                <Select
                  id='country'
                  variant='outlined'
                  value={state.form.country.code}
                >
                  {
                    countries.map(country => (
                      <MenuItem
                        key={country.code}
                        value={country.code}
                        onClick={() => handleChangeL2('country', country)}
                      >
                        {country.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='position'>Cargo</InputLabel>
                <Select
                  id='position'
                  value={state.form.position.code}
                  variant='outlined'
                >
                  {
                    state.positions.map(position => (
                      <MenuItem
                        key={position.code}
                        value={position.code}
                        onClick={() => handleChangeL2('position', position)}
                      >
                        {position.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <InputLabel htmlFor='startDate'>Fecha de inicio</InputLabel>
              <TextField
                id='startDate'
                value={state.form.startDate}
                variant='standard'
                fullWidth
                onChange={(e) => handleChangeL1(e)}
                type='date'
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='phone'
                value={state.form.phone}
                type='number'
                label='Teléfono'
                placeholder='Teléfono'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
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
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='state'>Estado</InputLabel>
                <Select
                  id='state'
                  value={state.form.state.code}
                  variant='outlined'
                >
                  {
                    states.map(stateUser => (
                      <MenuItem
                        key={stateUser.code}
                        value={stateUser.code}
                        onClick={() => handleChangeL2('state', stateUser)}
                      >
                        {stateUser.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id='password'
                value={state.form.password}
                label='Contraseña'
                placeholder='Contraseña'
                type='password'
                variant='outlined'
                onChange={(e) => handleChangeL1(e)}
                fullWidth
              />
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
                color='secondary'
                startIcon={<FactCheckIcon />}
                onClick={() => handleModal('permissionModal')}
              >
                Permisos
              </Button>
              <Button
                sx={{ marginLeft: '4px' }}
                variant='outlined'
                color='primary'
                startIcon={<DataSaverOnIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <PermissionModal
        open={state.modal.permissionModal}
        handleModal={handleModal}
        userPermissions={state.form.permissions}
        permissionsAvailable={state.form.position.permissionsAvailable}
        onAddPermissions={onAddPermissions}
      />
    </div>
  )
}

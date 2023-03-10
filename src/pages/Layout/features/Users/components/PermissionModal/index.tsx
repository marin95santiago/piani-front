import * as React from 'react'
import {
  Container,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import { PermissionCategory } from '../../../../../../schemas/User'
import permissionsList from '../../../../../../utils/permissionList.json'

type props = {
  open: boolean,
  userPermissions: any[],
  permissionsAvailable: string[],
  handleModal: (id: string) => void
  onAddPermissions: (selectedPermissions: string[]) => void
}

type State = {
  permissions?: PermissionCategory[]
  selectedPermissions: string[]
}

const initState: State = {
  selectedPermissions: []
}

export default function PermissionModal(props: props) {

  const [state, setState] = React.useState<State>(initState)

  React.useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    const permissions = permissionsList.map(permissionItem => {
      return {
        ...permissionItem,
        permissions: permissionItem.permissions.map(permission => {
          const checked = props.userPermissions.some(element => element === permission.code)
          return {
            ...permission,
            checked: checked
          }
        })
      }
    })

    setState({
      ...state,
      permissions: permissions,
      selectedPermissions: props.userPermissions
    })
  }

  function onCheckedPermission(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target

    let newPermissions = state.selectedPermissions

    if (checked) {
      newPermissions.push(id)
    } else {
      newPermissions = newPermissions.filter(element => element !== id)
    }

    const permissions = state.permissions?.map(permissionItem => {
      return {
        ...permissionItem,
        permissions: permissionItem.permissions.map(permission => {
          if (permission.code === id) {
            return {
              ...permission,
              checked: checked
            }
          } else {
            return permission
          }
        })
      }
    })

    setState({
      ...state,
      permissions: permissions,
      selectedPermissions: newPermissions
    })
  }

  function determineAvailablePermission (permission: any) {
    const isAvailable = props.permissionsAvailable?.some(element => element === permission.code) || false
    if (isAvailable) {
      return <Checkbox checked={permission.checked} id={permission.code} onChange={(e) => onCheckedPermission(e)} />
    } else {
      return <Checkbox checked={permission.checked} id={permission.code} disabled/>
    }
  }

  function onSave () {
    props.onAddPermissions(state.selectedPermissions)
    props.handleModal('permissionModal')
  }

  return (
    <div>
      <Modal
        open={props.open}
        style={{ overflow: 'auto' }}
        onClose={() => props.handleModal('permissionModal')}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Container style={{ marginTop: '20px', overflow: 'auto' }}>
          <Card>
            <CardHeader
              title='Permisos'
            />
            <CardContent>
              <Grid container spacing={1}>
                {
                  state.permissions?.map(permissionItem => (
                    <Grid key={permissionItem.category} item xs={12} sm={12} >
                      <Card>
                        <CardHeader
                          subheader={`Permisos de ${permissionItem.description}`}
                        />
                        <CardContent>
                          <Grid container spacing={1}>
                            {
                              permissionItem.permissions.map((permission: any) => (
                                <Grid key={permission.code} item xs={3} sm={3}>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={determineAvailablePermission(permission)}
                                      label={permission.description}
                                    />
                                  </FormGroup>
                                </Grid>
                              ))
                            }
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
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
                    onClick={onSave}
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

import * as React from 'react'
import { Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Link } from 'react-router-dom'
import UserContext from '../../../../contexts/User'
import { UserContextType } from '../../../../schemas/User'
import { buildSideMenuRoutesAdministration, buildSideMenuRoutesEntity, Route } from '../../../../utils/utils'

interface State {
  routesAdministration: Route[]
  routesByEntity: Route[]
}

const initialState = {
  routesAdministration: [],
  routesByEntity: []
}

export default function SideMenu() {

  const [ state, setState ] = React.useState<State>(initialState)
  const { userContext } = React.useContext(
    UserContext
  ) as UserContextType

  React.useEffect(() => {
    loadData()
  }, [])
  
  function loadData () {
    const routesAdministration = buildSideMenuRoutesAdministration(userContext.permissions)
    const routesByEntity = buildSideMenuRoutesEntity(userContext.permissions)
    setState({
      ...state,
      routesAdministration,
      routesByEntity
    })
  }

  return (
    <React.Fragment>
      <Box>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'black' }}>
                P
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Piani by La Margarite"} secondary={"version 1.0.0"} />
          </ListItem>
          <Divider />
          {state.routesAdministration.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={item.url}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'black' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />

                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        {
          state.routesByEntity.length > 0 ?
          (
            <React.Fragment>
              <Divider />
              <List>
                {state.routesByEntity.map((item, index) => (
                  <ListItem key={item.text} disablePadding>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={item.url}>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ) : ''
        }
      </Box>
    </React.Fragment>
  )
}
